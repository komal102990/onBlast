import React, { Component } from 'react';
import { TouchableOpacity, Platform, Keyboard, Easing } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import Video from 'react-native-video';
import {
    View,
    Text,
    Icon,
} from 'native-base';
import { RNCamera } from 'react-native-camera';
import { Theme } from 'src/styles';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import {
    AnTouchable,
} from 'src/components/common';
import BlastFormBoxA from 'src/components/BlastFormBoxA';
import BlastFormBoxB from 'src/components/BlastFormBoxB';
import { ProcessingManager } from 'react-native-video-processing';
import RNFetchBlob from 'rn-fetch-blob';
import Permissions from 'react-native-permissions';

class CameraScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cameraType: RNCamera.Constants.Type.front,
            live: false,
            place: {
                id: null,
                description: '',
            },
            caption: '',
            like: true,
            recording: false,
            recorded: false,
            videoURL: null,
            uploading: false,
            microphonePermission: false,
        };

        this.iref = {
            placeInput: null,
            captionInput: null,
        };

        this.changeCameraType = this._changeCameraType.bind(this);
    }

    componentDidMount() {
        this.props.navigator.setTitle({
            title: 'Blast',
        });

        if (Platform.OS === 'android') {
            Permissions.check('microphone').then((response) => {
                if (response !== 'authorized') {
                    Permissions.request('photo').then((result) => {
                        if (result === 'authorized') {
                            this.setState({
                                microphonePermission: true,
                            });
                        }
                    });
                } else {
                    this.setState({
                        microphonePermission: true,
                    });
                }
            });
        } else {
            this.setState({
                microphonePermission: true,
            });
        }
    }

    _changeCameraType() {
        if (this.state.cameraType === RNCamera.Constants.Type.back) {
            this.setState({
                cameraType: RNCamera.Constants.Type.front,
            });
        } else {
            this.setState({
                cameraType: RNCamera.Constants.Type.back,
            });
        }
    }

    _uploadReview() {
        this.setState({
            uploading: true,
        });
        let videoDownloadURL = null;
        let localImageURL = null;

        firebase.storage().ref(`/reviews/${this.props.user.id}/${Math.random().toString(36).substr(2, 9)}.mp4`)
            .putFile(
                this.state.videoURL.replace('file://', ''),
            )

            .then((response) => {
                console.log(ProcessingManager);
                videoDownloadURL = response.downloadURL;
                return ProcessingManager.getPreviewForSecond(this.state.videoURL, 0, { height: 640, width: 480 }, 'base64');
            })

            .then((data) => {
                localImageURL = `${RNFetchBlob.fs.dirs.CacheDir}/${Math.random().toString(36).substr(2, 9)}.jpg`;
                return RNFetchBlob.fs.writeFile(localImageURL, data, 'base64');
            })

            .then(() => (
                firebase.storage().ref(`/reviews/${this.props.user.id}/${Math.random().toString(36).substr(2, 9)}.jpg`)
                    .putFile(localImageURL)
            ))

            .then(response => (
                firebase.database().ref('/reviews')
                    .push({
                        preview: response.downloadURL,
                        video: videoDownloadURL,
                        good: this.state.like,
                        likes: 0,
                        views: 0,
                        created_at: firebase.database.ServerValue.TIMESTAMP,
                        place: this.state.place.id,
                        caption: this.state.caption,
                        reviewer: this.props.user.id,
                    })
            ))

            .then(() => {
                this.setState({
                    uploading: false,
                });
                this.props.navigator.pop();
            })
            .catch((error) => {
                console.error(error);
            });
    }

    async _startRecording() {
        this.setState({
            recording: true,
        });
        if (this.state.live) {
            // Live = new LiveStream();
            // Live.getLocalStream()
            // .then(stream => {
            //     console.log("stream", stream);
            //     this.setState({
            //         videoURL: stream.toURL()
            //     });
            // })
            // .catch((error) => {
            //     console.error(error);
            // });
            //
            // this.props.navigator.toggleNavBar({
            //     to: 'hidden',
            //     animated: true
            // });
        } else {
            this.circularProgress.animate(100, 30000, Easing.linear);
            const data = await this.camera.recordAsync({
                quality: RNCamera.Constants.VideoQuality['4:3'],
            });
            this.setState({
                recorded: true,
                videoURL: data.uri,
            });
        }
    }

    _stopRecording() {
        this.setState({
            recording: false,
        });

        if (this.state.live) {
            // Nothing to do ...
        } else {
            this.camera.stopRecording();
        }
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#000',
                }}
            >
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    {
                        (this.state.videoURL && (
                            <Video
                                ref={(ref) => {
                                    this.player = ref;
                                }}
                                style={{
                                    flex: 1,
                                }}
                                muted={false}
                                source={{ uri: this.state.videoURL.replace('file://', '') }}
                                resizeMode="cover"
                                onEnd={() => {
                                    this.player.seek(0);
                                }}
                            />
                        ))
                    }

                    {
                        (!this.state.videoURL && !this.state.recording && (
                            <AnTouchable
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    zIndex: 10,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={this.changeCameraType}
                            >
                                <Icon
                                    style={{
                                        color: '#fff',
                                        fontSize: 36,
                                        paddingRight: 10,
                                        paddingLeft: 5,
                                    }}
                                    type="Ionicons"
                                    name="ios-reverse-camera"
                                />
                            </AnTouchable>
                        ))
                    }

                    {
                        (!this.state.videoURL && this.state.microphonePermission && (
                            <RNCamera
                                style={{
                                    flex: 1,
                                }}
                                ref={(ref) => {
                                    this.camera = ref;
                                }}
                                captureAudio
                                type={this.state.cameraType}
                                flashMode={RNCamera.Constants.FlashMode.off}
                            />
                        ))
                    }

                    {
                        (!this.state.recording &&
                        ((!this.state.recorded && this.state.live) || (this.state.recorded && !this.state.live)) && (
                            <View
                                style={{
                                    flex: 1,
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <BlastFormBoxA
                                    place={this.state.place}
                                    onPlaceExpandedComponent={() => {
                                        this.props.navigator.showModal({
                                            screen: 'SelectBlastPlaceModal',
                                            navigatorButtons: {
                                                leftButtons: [{}],
                                            },
                                            passProps: {
                                                onSelectPlace: (place) => {
                                                    Keyboard.dismiss();

                                                    this.props.navigator.dismissModal();

                                                    setTimeout(() => {
                                                        this.setState({
                                                            place,
                                                        });
                                                    }, 300);
                                                },
                                                onRequestClose: () => {
                                                    Keyboard.dismiss();

                                                    this.props.navigator.dismissModal();
                                                },
                                            },
                                        });
                                    }}
                                    onCaptionExpandedComponent={() => {
                                        this.props.navigator.showModal({
                                            screen: 'SelectBlastCaptionModal',
                                            navigatorButtons: {
                                                leftButtons: [{}],
                                            },
                                            passProps: {
                                                title: 'Give us a caption',
                                                caption: this.state.caption,
                                                onRequestClose: () => {
                                                    Keyboard.dismiss();

                                                    this.props.navigator.dismissModal();
                                                },
                                                onSelectCaption: (caption) => {
                                                    Keyboard.dismiss();

                                                    this.props.navigator.dismissModal();

                                                    this.setState({
                                                        caption,
                                                    });
                                                },
                                            },
                                        });
                                    }}
                                    like={this.state.like}
                                    caption={this.state.caption}
                                    onChangeLike={() => {
                                        this.setState({
                                            like: !this.state.like,
                                        });
                                    }}
                                    uploading={this.state.uploading}
                                    blastButton={!this.state.live}
                                    onBlast={() => {
                                        this._uploadReview();
                                    }}
                                />
                            </View>
                        ))
                    }
                </View>

                <View
                    style={{
                        backgroundColor: Theme.Colors.Primary,
                        padding: 15,
                        alignItems: 'center',
                    }}
                >
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 11,
                            zIndex: 20,
                        }}
                        pointerEvents="none"
                    >
                        <AnimatedCircularProgress
                            style={{
                                display: (this.state.recorded && !this.state.live) ? 'none' : 'flex',
                            }}
                            ref={(ref) => {
                                this.circularProgress = ref;
                            }}
                            size={66}
                            width={6}
                            fill={0}
                            tintColor="#fff"
                            backgroundColor="transparent"
                            onAnimationComplete={() => {
                                if (!this.state.recorded && this.state.recording) {
                                    this._stopRecording();
                                }
                            }}
                        />
                    </View>

                    {
                        (!this.state.recorded) && (
                            <BlastFormBoxB
                                switch={!this.state.recording && !this.state.recorded}
                                type={this.state.live}
                                onChangeType={() => {
                                    this.setState({
                                        live: !this.state.live,
                                    });
                                }}
                            />
                        )
                    }

                    {
                        (!this.state.recording && !this.state.recorded && (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this._startRecording();
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: '#fff',
                                        width: 20,
                                        height: 20,
                                        borderRadius: 10,
                                    }}
                                />
                            </TouchableOpacity>
                        ))
                    }

                    {
                        (this.state.recording && (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this._stopRecording();
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: '#fff',
                                        width: 20,
                                        height: 20,
                                    }}
                                />
                            </TouchableOpacity>
                        ))
                    }

                    {
                        (this.state.recorded && (
                            <Text
                                style={{
                                    fontFamily: Theme.Fonts.HelveticaNeue,
                                    textAlign: 'center',
                                    color: '#fff',
                                    fontSize: 12,
                                    paddingTop: 16,
                                    paddingBottom: 16,
                                }}
                            >
                                Complete the form and submit your Blast
                            </Text>
                        ))
                    }
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    user: state.userContext.get('user'),
});

export default connect(mapStateToProps)(CameraScreen);
