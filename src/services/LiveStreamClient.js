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
import ioClient from 'socket.io-client';

let PeerConnection = null;

export default class LiveStreamClient {

    constructor() {
        PeerConnection = new RTCPeerConnection({
            "iceServers": [
                {"url": "stun:stun.l.google.com:19302"}
            ]
        });

        socket = ioClient('http://198.199.112.124:3002/');

    }

    connectToStream( socketId ) {
        return new Promise((resolve, reject) => {
            PeerConnection.onicecandidate = (event) => {
              console.log('onicecandidate');
              if (event.candidate) {
                socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
              }
            };

            PeerConnection.onnegotiationneeded = () => {
                console.log('onnegotiationneeded');
            };

            PeerConnection.onsignalingstatechange = (event) => {
              console.log('onsignalingstatechange', event);
              if (event.target.iceConnectionState === 'connected') {
                console.log('SE CONECTÓ!');
              }
            };

            PeerConnection.onaddstream = (event) => {
                console.log('onAddStream', event);
                resolve(event.stream);
            };

            socket.on('exchange', function(data){
                console.log( 'exchange' );
                if (data.sdp) {
                    console.log('exchange sdp');
                    PeerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp))
                    .then(() => {
                        if (PeerConnection.remoteDescription.type == "offer")
                        PeerConnection.createAnswer()
                        .then((desc) => {
                            console.log('createAnswer');
                            PeerConnection.setLocalDescription(desc)
                            .then(() => {
                                console.log('setLocalDescription');
                                socket.emit('exchange', {'to': socketId, 'sdp': PeerConnection.localDescription });
                            });
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    })
                } else {
                    console.log('exchange candidate');
                    PeerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
                }
            });

            PeerConnection.createOffer()
            .then((desc) => {
                console.log('createOffer');
                PeerConnection.setLocalDescription(desc)
                .then(() => {
                    console.log('setLocalDescription');
                    socket.emit('exchange', {'to': socketId, 'sdp': PeerConnection.localDescription });
                });
            })
            .catch((error) => {
                console.error(error);
            });
        });
    }
}
