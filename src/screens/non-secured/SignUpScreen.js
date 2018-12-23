import React, { Component } from 'react';
import { View, Icon, Text } from 'native-base';
import { Image, TouchableOpacity, Platform, Keyboard, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Theme } from 'src/styles';
import { AnInput, AnButton, AnTouchable } from 'src/components/common';
import { UserContextActions } from 'src/redux/actions';
import firebase from 'react-native-firebase';
import Images from '@assets';
import Modal from 'react-native-modal';
import PlacePicker from 'src/components/place-picker/PlacePicker';

const { height } = Dimensions.get('window');

class SignUpScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showErrorModal: false,
            errorMessage: '',
            height,
            name: '',
            surname: '',
            email: '',
            place: null,
            password: '',
            repeatPassword: '',
        };
    }


    componentDidMount() {
        const eventshow = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
        const eventhide = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

        this.keyboardDidShowListener = Keyboard.addListener(eventshow, (e) => {
            this.setState({
                isKeyboardOpen: true,
                height: height - e.endCoordinates.height,
            });
        });

        this.keyboardDidHideListener = Keyboard.addListener(eventhide, () => {
            this.setState({
                isKeyboardOpen: false,
                height,
            });
        });
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
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
                    <TouchableOpacity
                        style={{
                            zIndex: 9,
                            padding: 0,
                            position: 'absolute',
                            right: 10,
                            top: 10,
                        }}
                        onPress={() => {
                            this.props.navigator.pop({
                                animated: false,
                            });
                        }}
                    >
                        <Icon
                            style={{
                                fontSize: 40,
                                color: '#fff',
                            }}
                            type="EvilIcons"
                            name="close"
                        />
                    </TouchableOpacity>

                    {
                        (!this.state.isKeyboardOpen && (
                            <View
                                style={{
                                    height: (this.state.isKeyboardOpen) ? 0 : undefined,
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
                        ))
                    }

                    <View
                        style={{
                            marginTop: (this.state.isKeyboardOpen) ? 70 : 0,
                            flex: (this.state.isKeyboardOpen) ? undefined : 0.8,
                            height: (this.state.keyboardOpen) ?
                                this.state.height - 70 : undefined,
                        }}
                    >
                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={{
                                paddingBottom: 50,
                            }}
                            style={{
                                height: (this.state.isKeyboardOpen) ?
                                    this.state.height - 70 : undefined,
                            }}
                        >
                            <View
                                style={{
                                    // flex: 0.6,
                                    maxWidth: 280,
                                    alignSelf: 'center',
                                    width: '100%',
                                }}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        marginBottom: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            flex: 1,
                                        }}
                                    >
                                        <View
                                            style={{
                                                maxHeight: 40,
                                                borderBottomColor: '#fff',
                                                borderBottomWidth: 1,
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                }}
                                            >
                                                <AnInput
                                                    placeholder="Name"
                                                    placeholderTextColor="#fff"
                                                    customStyles={{
                                                        fontFamily: Theme.Fonts.HelveticaNeueThin,
                                                        height: 30,
                                                        color: '#fff',
                                                        textAlign: 'left',
                                                        borderBottomWidth: 0,
                                                        padding: 0,
                                                        fontSize: 20,
                                                    }}
                                                    autoCorrect={false}
                                                    value={this.state.name}
                                                    onChangeText={(name) => {
                                                        this.setState({
                                                            name,
                                                        });
                                                    }}
                                                    autoCapitalize="none"
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        marginBottom: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            flex: 1,
                                        }}
                                    >
                                        <View
                                            style={{
                                                maxHeight: 40,
                                                borderBottomColor: '#fff',
                                                borderBottomWidth: 1,
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                }}
                                            >
                                                <AnInput
                                                    placeholder="Surname"
                                                    placeholderTextColor="#fff"
                                                    customStyles={{
                                                        fontFamily: Theme.Fonts.HelveticaNeueThin,
                                                        height: 30,
                                                        color: '#fff',
                                                        textAlign: 'left',
                                                        borderBottomWidth: 0,
                                                        padding: 0,
                                                        fontSize: 20,
                                                    }}
                                                    autoCorrect={false}
                                                    value={this.state.surname}
                                                    onChangeText={(surname) => {
                                                        this.setState({
                                                            surname,
                                                        });
                                                    }}
                                                    autoCapitalize="none"
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                    }}
                                >
                                    <View>
                                        <PlacePicker
                                            placeholder="Place"
                                            place={this.state.place}
                                            onSelectPlace={(place) => {
                                                this.setState({
                                                    place: {
                                                        id: place.id,
                                                        label: place.label,
                                                        location: place.location,
                                                    },
                                                });
                                            }}
                                        />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        marginBottom: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            flex: 1,
                                        }}
                                    >
                                        <View
                                            style={{
                                                maxHeight: 40,
                                                borderBottomColor: '#fff',
                                                borderBottomWidth: 1,
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                }}
                                            >
                                                <AnInput
                                                    placeholder="Email"
                                                    placeholderTextColor="#fff"
                                                    customStyles={{
                                                        fontFamily: Theme.Fonts.HelveticaNeueThin,
                                                        height: 30,
                                                        color: '#fff',
                                                        textAlign: 'left',
                                                        borderBottomWidth: 0,
                                                        padding: 0,
                                                        fontSize: 20,
                                                    }}
                                                    autoCorrect={false}
                                                    value={this.state.email}
                                                    onChangeText={(email) => {
                                                        this.setState({
                                                            email,
                                                        });
                                                    }}
                                                    keyboardType="email-address"
                                                    autoCapitalize="none"
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        marginBottom: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            flex: 1,
                                        }}
                                    >
                                        <View
                                            style={{
                                                maxHeight: 40,
                                                borderBottomColor: '#fff',
                                                borderBottomWidth: 1,
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                }}
                                            >
                                                <AnInput
                                                    placeholder="Password"
                                                    placeholderTextColor="#fff"
                                                    customStyles={{
                                                        fontFamily: Theme.Fonts.HelveticaNeueThin,
                                                        height: 30,
                                                        color: '#fff',
                                                        textAlign: 'left',
                                                        borderBottomWidth: 0,
                                                        padding: 0,
                                                        fontSize: 20,
                                                    }}
                                                    autoCorrect={false}
                                                    secureTextEntry
                                                    value={this.state.password}
                                                    onChangeText={(password) => {
                                                        this.setState({
                                                            password,
                                                        });
                                                    }}
                                                    autoCapitalize="none"
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flex: 1,
                                        marginBottom: 10,
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            flex: 1,
                                        }}
                                    >
                                        <View
                                            style={{
                                                maxHeight: 40,
                                                borderBottomColor: '#fff',
                                                borderBottomWidth: 1,
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flex: 1,
                                                }}
                                            >
                                                <AnInput
                                                    placeholder="Repeat Password"
                                                    placeholderTextColor="#fff"
                                                    customStyles={{
                                                        fontFamily: Theme.Fonts.HelveticaNeueThin,
                                                        height: 30,
                                                        color: '#fff',
                                                        textAlign: 'left',
                                                        borderBottomWidth: 0,
                                                        padding: 0,
                                                        fontSize: 20,
                                                    }}
                                                    autoCorrect={false}
                                                    secureTextEntry
                                                    value={this.state.repeatPassword}
                                                    onChangeText={(repeatPassword) => {
                                                        this.setState({
                                                            repeatPassword,
                                                        });
                                                    }}
                                                    autoCapitalize="none"
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flex: 0.2,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 20,
                                    }}
                                >
                                    <AnButton
                                        loading={this.state.loading}
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
                                        additionalButtonProps={{
                                            block: false,
                                            large: false,
                                            rounded: true,
                                            disabled: !this.state.name ||
                                            !this.state.surname ||
                                            !this.state.email ||
                                            !this.state.place ||
                                            !this.state.password ||
                                            !this.state.repeatPassword ||
                                            this.state.password !== this.state.repeatPassword,
                                        }}
                                        buttonTextLabel="SIGN UP"
                                        onPress={() => {
                                            this.setState({
                                                loading: true,
                                            });

                                            let userId = null;
                                            firebase.auth()
                                                .createUserAndRetrieveDataWithEmailAndPassword(
                                                    this.state.email,
                                                    this.state.password,
                                                )

                                                .then((user) => {
                                                    userId = user.user._user.uid;
                                                    return firebase.database().ref(`/users/${user.user._user.uid}`)
                                                        .set({
                                                            blasts: 0,
                                                            email: this.state.email,
                                                            my_blasts: 0,
                                                            my_places: 0,
                                                            my_reviewers: 0,
                                                            my_viewers: 0,
                                                            my_views: 0,
                                                            name: this.state.name,
                                                            surname: this.state.surname,
                                                            place: this.state.place,
                                                        });
                                                })

                                                .then(() => {
                                                    this.props.fetchUserContext(userId);
                                                })

                                                .catch((error) => {
                                                    this.setState({
                                                        loading: false,
                                                        showErrorModal: true,
                                                        errorMessage: error.message,
                                                    });
                                                });
                                        }}
                                    />
                                </View>
                            </View>
                        </ScrollView>
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
                                    { this.state.errorMessage }
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

export default connect(null, mapDispatchToProps)(SignUpScreen);
