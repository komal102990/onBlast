import React, { Component } from 'react';
import { View } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { AnInput, AnButton } from 'src/components/common';
import { Theme } from 'src/styles';


class NormalLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    render() {
        return (
            <View>
                <View
                    style={{
                        marginBottom: 20,
                        height: 100,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottomColor: '#fff',
                            borderBottomWidth: 1,
                            alignItems: 'center',
                            flex: 1,
                            marginBottom: 10,
                        }}
                    >
                        <Icon
                            type="EvilIcons"
                            name="user"
                            style={{
                                fontSize: 35,
                                color: '#fff',
                                width: 40,
                                height: 30,
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

                                value={this.state.username}

                                onChangeText={(username) => {
                                    this.setState({
                                        ...this.state,
                                        username,
                                    });
                                }}

                                keyboardType="email-address"

                                autoCorrect={false}

                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottomColor: '#fff',
                            borderBottomWidth: 1,
                            alignItems: 'center',
                            flex: 1,
                        }}
                    >
                        <Icon
                            type="EvilIcons"
                            name="lock"
                            style={{
                                fontSize: 35,
                                color: '#fff',
                                width: 40,
                                height: 30,
                            }}
                        />

                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <AnInput
                                placeholder="Password"

                                placeholderTextColor="#fff"

                                autoCorrect={false}

                                customStyles={{
                                    fontFamily: Theme.Fonts.HelveticaNeueThin,
                                    height: 30,
                                    color: '#fff',
                                    textAlign: 'left',
                                    borderBottomWidth: 0,
                                    padding: 0,
                                    fontSize: 20,
                                }}

                                value={this.state.password}

                                onChangeText={(password) => {
                                    this.setState({
                                        ...this.state,
                                        password,
                                    });
                                }}

                                secureTextEntry

                                autoCapitalize="none"
                            />
                        </View>
                    </View>
                </View>

                <AnButton
                    loading={this.props.loading}
                    buttonStyle={{
                        ...this.props.buttonStyle,
                    }}
                    additionalButtonProps={{
                        block: false,
                        large: false,
                        rounded: true,
                    }}
                    buttonTextStyle={{
                        ...this.props.buttonTextStyle,
                    }}
                    buttonTextLabel="LOGIN"
                    onPress={() => {
                        this.props.onLoginButtonPress(this.state.username, this.state.password);
                    }}
                />
            </View>
        );
    }
}

export default connect(undefined, undefined)(NormalLogin);
