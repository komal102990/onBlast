import React, { Component } from 'react';
import {
    Container,
    View,
    Icon,
    Text,
} from 'native-base';
import { Image, Platform, Keyboard, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Theme } from 'src/styles';
import {
    AnInput,
    AnButton,
    AnTouchable,
} from 'src/components/common';
import {
    NavActions,
} from 'src/redux/actions';
import firebase from 'react-native-firebase';
import Images from '@assets';
import Modal from 'react-native-modal';

const { height } = Dimensions.get('window');
const ImagePicker = require('react-native-image-picker');

class ProfileScreen extends Component {
    static navigatorStyle = {
        navBarHidden: false,
        drawUnderNavBar: true,
        navBarTransparent: true,
        navBarTranslucent: false,
        navBarTextColor: '#fff',
        navBarButtonColor: '#fff',
        navBarNoBorder: true,
        topBarElevationShadowEnabled: false,
        tabBarHidden: true,
        screenBackgroundColor: Theme.Colors.Primary,
    };

    constructor(props) {
        super(props);

        this.state = {
            showErrorModal: false,
            errorMessage: '',
            uploading: false,
            height,
            name: this.props.context.name,
            surname: this.props.context.surname,
            email: this.props.context.email,
            place: this.props.context.place,
            avatar: this.props.context.avatar,
            newAvatar: null,
        };
    }

    componentDidMount() {
        const eventshow = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
        const eventhide = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

        this.keyboardDidShowListener = Keyboard.addListener(eventshow, (e) => {
            this.setState({
                height: height - e.endCoordinates.height,
            });
        });

        this.keyboardDidHideListener = Keyboard.addListener(eventhide, () => {
            this.setState({
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
            <Container
                style={{
                    ...Theme.Scaffolding.Container,
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
                            height: this.state.height,
                        }}
                    >
                        <ScrollView
                            contentContainerStyle={{
                                paddingBottom: 50,
                            }}
                            style={{
                                height: this.state.height,
                            }}
                        >
                            <AnTouchable
                                activeOpacity={0.6}
                                style={{
                                    marginTop: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 150,
                                }}
                                onPress={() => {
                                    ImagePicker.showImagePicker({
                                        title: 'Choose an option',
                                        maxWidth: 350,
                                        maxHeight: 350,
                                        storageOptions: {
                                            skipBackup: true,
                                            path: 'images',
                                        },
                                    }, (response) => {
                                        if (response.didCancel) {
                                            console.log('User cancelled image picker');
                                        } else if (response.error) {
                                            console.log('ImagePicker Error: ', response.error);
                                        } else if (response.customButton) {
                                            console.log('User tapped custom button: ', response.customButton);
                                        } else {
                                            this.setState({
                                                avatar: response.uri,
                                                newAvatar: response,
                                            });
                                        }
                                    });
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: 'center',
                                    }}
                                >
                                    {
                                        (this.state.avatar !== null && this.state.avatar !== undefined && this.state.avatar !== '') ? (
                                            <Image
                                                source={{
                                                    uri: this.state.avatar,
                                                }}
                                                style={{
                                                    borderColor: '#fff',
                                                    borderWidth: 2,
                                                    width: 90,
                                                    height: 90,
                                                    borderRadius: 45,
                                                }}
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <Image
                                                source={Images.defaultUser}
                                                style={{
                                                    borderColor: '#fff',
                                                    borderWidth: 2,
                                                    width: 90,
                                                    height: 90,
                                                    borderRadius: 45,
                                                }}
                                                resizeMode="cover"
                                            />
                                        )
                                    }
                                </View>
                            </AnTouchable>
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
                                                    editable={false}
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
                                                    placeholder="Place"
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
                                                    value={this.state.place}
                                                    onChangeText={(place) => {
                                                        this.setState({
                                                            place,
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
                                        loading={this.state.uploading}
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
                                            !this.state.place,
                                        }}
                                        buttonTextLabel="EDIT"
                                        onPress={() => {
                                            if (this.state.newAvatar !== null) {
                                                this.setState({
                                                    uploading: true,
                                                });
                                                firebase.storage().ref(`/users/${this.props.context.id}/profile.jpg`)
                                                    .putFile(this.state.newAvatar.uri)
                                                    .then((response) => {
                                                        console.log('response', response);
                                                        const updates = {};
                                                        updates[`users/${this.props.context.id}/name`] = this.state.name;
                                                        updates[`users/${this.props.context.id}/surname`] = this.state.surname;
                                                        updates[`users/${this.props.context.id}/place`] = this.state.place;
                                                        updates[`users/${this.props.context.id}/avatar`] = response.downloadURL;
                                                        firebase.database().ref().update(updates);
                                                        this.setState({
                                                            uploading: false,
                                                        });

                                                        this.props.navigator.pop({
                                                            animated: true,
                                                            animationType: 'slide-horizontal',
                                                        });
                                                    })
                                                    .catch(() => {
                                                        this.setState({
                                                            uploading: false,
                                                        });
                                                    });
                                            } else {
                                                const updates = {};
                                                updates[`users/${this.props.context.id}/name`] = this.state.name;
                                                updates[`users/${this.props.context.id}/surname`] = this.state.surname;
                                                updates[`users/${this.props.context.id}/place`] = this.state.place;
                                                firebase.database().ref().update(updates);
                                                this.props.navigator.pop({
                                                    animated: true,
                                                });
                                            }
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
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    context: state.userContext.get('user'),
});

const mapDispatchToProps = dispatch => ({
    changeAppRoot: (root) => {
        dispatch(NavActions.changeAppRoot(root));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
