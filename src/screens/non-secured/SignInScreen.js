import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { View, Text, Icon } from 'native-base';
import { Theme } from 'src/styles';
import NormalLogin from 'src/components/security/NormalLogin';
import GoogleLogin from 'src/components/security/GoogleLogin';
import FacebookLogin from 'src/components/security/FacebookLogin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { UserContextActions } from 'src/redux/actions';
import Images from '@assets';
import { GoogleSignin } from 'react-native-google-signin';
import Modal from 'react-native-modal';
import { AnTouchable } from 'src/components/common';

class SignInScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            googleLoading: false,
            facebookLoading: false,
            showErrorModal: false,
        };
    }

    componentDidMount() {
        this.props.navigator.setTitle({
            title: 'Sign In',
        });
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        height: '100%',
                    }}
                >
                    <View
                        style={{
                            marginTop: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 0.2,
                            marginBottom: 20,
                        }}
                    >
                        <View
                            style={{
                                alignItems: 'center',
                            }}
                        >
                            <Image
                                source={Images.onblastlogo}
                                style={{
                                    flex: 1,
                                }}
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flex: 0.7,
                            maxWidth: 280,
                            alignSelf: 'center',
                            width: '100%',
                        }}
                    >
                        <View
                            style={{
                                marginBottom: 20,
                            }}
                        >
                            <NormalLogin
                                primary
                                buttonStyle={{
                                    ...Theme.Buttons.Primary,
                                    backgroundColor: '#B34D41',
                                    minWidth: 150,
                                    alignSelf: 'center',
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    borderColor: '#fff',
                                    justifyContent: 'center',
                                    padding: 0,
                                    minHeight: 40,
                                }}
                                buttonTextStyle={{
                                    ...Theme.Buttons.Text.Primary,
                                    fontSize: 22,
                                    lineHeight: 28,
                                }}
                                loading={this.state.loading}
                                onLoginButtonPress={(email, password) => {
                                    if (!email || !password) return;

                                    this.setState({
                                        loading: true,
                                    });

                                    firebase.auth()
                                        .signInAndRetrieveDataWithEmailAndPassword(
                                            email, password,
                                        )

                                        .then((response) => {
                                            if (response) {
                                                this.props.fetchUserContext(response.user._user.uid);
                                            }
                                        })

                                        .catch(() => {
                                            this.setState({
                                                loading: false,
                                                showErrorModal: true,
                                            });
                                        });
                                }}
                            />
                        </View>

                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    minHeight: 5,
                                    maxHeight: 50,
                                    marginBottom: 10,
                                }}
                            >
                                <FacebookLogin
                                    loading={this.state.facebookLoading}
                                    onLoginButtonPress={() => {
                                        this.setState({
                                            facebookLoading: true,
                                        });

                                        let userId = null;

                                        LoginManager.logInWithReadPermissions(['public_profile', 'email'])
                                            .then((result) => {
                                                if (!result.isCancelled) {
                                                    return AccessToken.getCurrentAccessToken();
                                                }

                                                return Promise.reject();
                                            })

                                            .then((data) => {
                                                // create a new firebase credential with the token
                                                const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

                                                // login with credential
                                                return firebase.auth()
                                                    .signInAndRetrieveDataWithCredential(
                                                        credential,
                                                    );
                                            })

                                            .then((response) => {
                                                if (response) {
                                                    userId = response.user._user.uid;

                                                    return firebase.database().ref(`/users/${response.user._user.uid}`)
                                                        .transaction((snapshot) => {
                                                            if (snapshot === null) {
                                                                return {
                                                                    blasts: 0,
                                                                    email: response.additionalUserInfo.profile.email,
                                                                    my_blasts: 0,
                                                                    my_places: 0,
                                                                    my_reviewers: 0,
                                                                    my_viewers: 0,
                                                                    my_views: 0,
                                                                    name: response.additionalUserInfo.profile.first_name,
                                                                    surname: response.additionalUserInfo.profile.last_name,
                                                                    avatar: response.user._user.photoURL,
                                                                    place: '',
                                                                };
                                                            }

                                                            return snapshot;
                                                        });
                                                }

                                                return Promise.reject();
                                            })

                                            .then(() => {
                                                this.props.fetchUserContext(userId);
                                            })

                                            .catch(() => {
                                                // Nothing to do ...
                                            })

                                            .finally(() => {
                                                this.setState({
                                                    facebookLoading: false,
                                                });
                                            });
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    minHeight: 5,
                                    maxHeight: 50,
                                    marginBottom: 10,
                                }}
                            >
                                <GoogleLogin
                                    loading={this.state.googleLoading}
                                    onLoginButtonPress={() => {
                                        this.setState({
                                            googleLoading: true,
                                        });
                                        let userId = null;
                                        GoogleSignin.configure({
                                            iosClientId: '455307126790-pkvkqbbiamm2uomjef9rr79gg6p7pnkg.apps.googleusercontent.com',
                                        })
                                            .then(() => GoogleSignin.signIn())

                                            .then((data) => {
                                                // create a new firebase credential with the token
                                                const credential = firebase.auth.GoogleAuthProvider
                                                    .credential(
                                                        data.idToken, data.accessToken,
                                                    );

                                                // login with credential
                                                return firebase.auth()
                                                    .signInAndRetrieveDataWithCredential(
                                                        credential,
                                                    );
                                            })

                                            .then((response) => {
                                                if (response) {
                                                    userId = response.user._user.uid;

                                                    return firebase.database().ref(`/users/${response.user._user.uid}`)
                                                        .transaction((snapshot) => {
                                                            if (snapshot === null) {
                                                                return {
                                                                    blasts: 0,
                                                                    email: response.additionalUserInfo.profile.email,
                                                                    my_blasts: 0,
                                                                    my_places: 0,
                                                                    my_reviewers: 0,
                                                                    my_viewers: 0,
                                                                    my_views: 0,
                                                                    name: response.additionalUserInfo.profile.given_name,
                                                                    surname: response.additionalUserInfo.profile.family_name,
                                                                    place: null,
                                                                    avatar: response.user._user.photoURL,
                                                                };
                                                            }

                                                            return snapshot;
                                                        });
                                                }

                                                return Promise.reject();
                                            })

                                            .then(() => {
                                                this.props.fetchUserContext(userId);
                                            })

                                            .catch(() => {
                                                // Nothing to do ...
                                            })

                                            .finally(() => {
                                                this.setState({
                                                    googleLoading: false,
                                                });
                                            });
                                    }}
                                />
                            </View>
                        </View>

                        <View
                            style={{
                                flex: 0.3,
                                marginTop: 30,
                                alignItems: 'center',
                                justifyContent: 'space-around',
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    marginBottom: 20,
                                }}
                                onPress={() => {
                                    this.props.navigator.push({
                                        screen: 'SignUpScreen',
                                        animationType: 'fade',
                                    });
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: Theme.Fonts.HelveticaNeueMedium,
                                        color: '#fff',
                                        fontSize: 14,
                                    }}
                                >
                                    Don&#8216;t have an account?
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    marginTop: 10,
                                }}
                                onPress={() => {
                                    this.props.navigator.push({
                                        screen: 'ForgotYourPasswordScreen',
                                        animationType: 'fade',
                                    });
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: Theme.Fonts.HelveticaNeueMedium,
                                        color: '#fff',
                                        fontSize: 14,
                                    }}
                                >
                                    Forgot your password?
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Modal
                    isVisible={this.state.showErrorModal}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: 'transparent',
                                padding: 15,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                }}
                            >
                                <Icon
                                    type="MaterialIcons"
                                    name="error-outline"
                                    style={{
                                        width: 30,
                                        height: 26,
                                        fontSize: 28,
                                        color: '#F04237',
                                        marginRight: 10,
                                    }}
                                />

                                <Text
                                    style={{
                                        fontFamily: Theme.Fonts.HelveticaNeueLight,
                                        fontSize: 22,
                                    }}
                                >
                                    Error
                                </Text>
                            </View>
                            <View
                                style={{
                                    maxWidth: 230,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: Theme.Fonts.HelveticaNeueLight,
                                        fontSize: 18,
                                    }}
                                >
                                    The username or password is incorrect.
                                </Text>
                            </View>

                            <View
                                style={{
                                    marginTop: 40,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <AnTouchable
                                    onPress={() => {
                                        this.setState({
                                            showErrorModal: false,
                                        });
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: Theme.Fonts.HelveticaNeueLight,
                                        }}
                                    >
                                        Ok
                                    </Text>
                                </AnTouchable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchUserContext: (profileId) => {
        dispatch(UserContextActions.fetchUserContext(profileId));
    },
});

export default connect(null, mapDispatchToProps)(SignInScreen);
