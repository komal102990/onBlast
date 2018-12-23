import React, { Component } from 'react';
import { View, Icon, Text } from 'native-base';
import Modal from 'react-native-modal';
import { Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Theme } from 'src/styles';
import firebase from 'react-native-firebase';
import { AnInput, AnButton, AnTouchable } from 'src/components/common';
import Images from '@assets';

class ForgotYourPasswordScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            title: '',
            message: '',
            showModal: '',
            loading: false,
        };
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
                            flex: 0.8,
                            flexDirection: 'column',
                            maxWidth: 280,
                            alignSelf: 'center',
                            width: '100%',
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                marginBottom: 20,
                            }}
                        >
                            <View
                                style={{
                                    alignItems: 'center',
                                    height: 40,
                                    marginBottom: 40,
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
                                    <Icon
                                        type="MaterialIcons"
                                        name="email"
                                        style={{
                                            fontSize: 30,
                                            color: '#fff',
                                            width: 40,
                                        }}
                                    />

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

                            <View
                                style={{

                                }}
                            >
                                <AnButton
                                    loading={this.state.loading}
                                    buttonStyle={{
                                        ...Theme.Buttons.Primary,
                                        backgroundColor: '#B34D41',
                                        width: 220,
                                        alignSelf: 'center',
                                        borderRadius: 30,
                                        borderWidth: 1,
                                        borderColor: '#fff',
                                        justifyContent: 'center',
                                        padding: 0,
                                        paddingLeft: 20,
                                        paddingRight: 20,
                                        minHeight: 40,
                                    }}
                                    buttonTextStyle={{
                                        ...Theme.Buttons.Text.Primary,
                                        fontSize: 17,
                                        lineHeight: 28,
                                    }}
                                    additionalButtonProps={{
                                        block: false,
                                        large: false,
                                        rounded: true,
                                        disabled: !this.state.email,
                                    }}
                                    buttonTextLabel="RESET PASSWORD"
                                    onPress={() => {
                                        this.setState({
                                            loading: true,
                                        });
                                        firebase.auth().sendPasswordResetEmail(this.state.email)
                                            .then(() => {
                                                this.setState({
                                                    loading: false,
                                                    title: 'Success',
                                                    message: 'Please check your email to reset your password',
                                                    showModal: true,
                                                });
                                            })
                                            .catch(() => {
                                                this.setState({
                                                    loading: false,
                                                    title: 'Error',
                                                    message: 'There was an error when trying to reset your password.',
                                                    showModal: true,
                                                });
                                            });
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <Modal
                    isVisible={this.state.showModal}
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
                                    {this.state.title}
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
                                    {this.state.message}
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
                                            showModal: false,
                                        });
                                        this.props.navigator.pop();
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

export default connect(null, null)(ForgotYourPasswordScreen);
