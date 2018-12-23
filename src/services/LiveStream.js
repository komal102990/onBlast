import {
    Dimensions,
} from 'react-native';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    getUserMedia,
} from 'react-native-webrtc';
import firebase from 'react-native-firebase';

import ioClient from 'socket.io-client';

let PeerConnections = {};
let socket = null;
let localStream = null;

export default class LiveStream {

    constructor() {
        socket = ioClient('http://198.199.112.124:3002/');

        socket.on('exchange', (data) => {
            const socketId = data.from;
            if ( !(socketId in PeerConnections) ) {
                console.log( 'creado' );
                this.createNewPeerConnection(socketId);
            }

            if (data.sdp) {
                console.log('exchange sdp');
                PeerConnections[socketId].setRemoteDescription(new RTCSessionDescription(data.sdp))
                .then(() => {
                    if (PeerConnections[socketId].remoteDescription.type == "offer")
                    PeerConnections[socketId].createAnswer()
                    .then((desc) => {
                        console.log('createAnswer');
                        PeerConnections[socketId].setLocalDescription(desc)
                        .then(() => {
                            console.log('setLocalDescription');
                            socket.emit('exchange', {'to': data.from, 'sdp': PeerConnections[socketId].localDescription });
                        });
                    });
                })
                .catch((error) => {
                    console.error(error);
                })
            } else {
                console.log('exchange candidate');
                PeerConnections[socketId].addIceCandidate(new RTCIceCandidate(data.candidate));
            }
        });
    }

    getLocalStream() {
        console.log('getLocalStream');
        return MediaStreamTrack.getSources()
        .then(sourceInfos => {
            let videoSourceId;
            for (let i = 0; i < sourceInfos.length; i++) {
                const sourceInfo = sourceInfos[i];
                if(sourceInfo.kind == "video" && sourceInfo.facing == "front") {
                    videoSourceId = sourceInfo.id;
                }
            }
            return getUserMedia({
                audio: true,
                video: {
                    mandatory: {
                        minWidth: Dimensions.width,
                        minHeight: Dimensions.height,
                        minFrameRate: 30
                    },
                    facingMode: "user",
                    optional: (videoSourceId ? [{sourceId: videoSourceId}] : [])
                }
            });
        })
        .then(stream => {
            return new Promise((resolve, reject) => {
                if ( socket.io.engine.id == null ) {
                    socket.on('connect', () => {
                        const firebaseLiveId = firebase.database().ref('lives')
                        .push({
                            id: socket.io.engine.id
                        });
                        localStream = stream;
                        resolve(stream);
                    });
                } else {
                    const firebaseLiveId = firebase.database().ref('lives')
                    .push({
                        id: socket.io.engine.id
                    });
                    localStream = stream;
                    resolve(stream);
                }
            });
        })
        .catch(error => {
            console.error(error);
        })
    }

    createNewPeerConnection(socketId) {
        console.log('socketId', PeerConnections);
        PeerConnections[socketId] = new RTCPeerConnection({
            "iceServers": [
                {"url": "stun:stun.l.google.com:19302"}
            ]
        });
        console.log('socketId1', socketId);

        PeerConnections[socketId].onicecandidate = (event) => {
            console.log('onicecandidate')
        };

        PeerConnections[socketId].onnegotiationneeded = () => {
            console.log('onnegotiationneeded');
        };

        PeerConnections[socketId].onsignalingstatechange = (event) => {
            console.log('onsignalingstatechange');
            if (event.target.iceConnectionState === 'connected') {
                console.log('SE CONECTÓ!');
            }
        };

        PeerConnections[socketId].onaddstream = (event) => {
            console.log('onAddStream');
        };

        PeerConnections[socketId].addStream(localStream);
    }
}
