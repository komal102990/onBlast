import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { View, Icon } from 'native-base';
import { Theme } from 'src/styles';
import { AnButton } from 'src/components/common';

const EmailLogin = props => (
    <AnButton
        loading={props.loading}
        buttonStyle={{
            backgroundColor: '#fff',
            justifyContent: (!props.loading) ? 'flex-start' : 'center',
            borderRadius: 40,
            flex: 1,
            flexGrow: 1,
        }}
        additionalButtonProps={{
            block: true,
            large: true,
        }}
        buttonContent={(loading) => {
            if (loading) {
                return (
                    <ActivityIndicator
                        color="#fff"
                    />
                );
            }

            return (
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        padding: 5,
                        alignItems: 'center',
                    }}
                >
                    <Icon
                        type='Zocial'
                        name="email"
                        style={{
                            color: '#E99262',
                            marginLeft: 10,
                            fontSize: 23,
                        }}
                    />

                    <Text
                        style={{
                            ...Theme.Buttons.Text.Primary,
                            color: '#E99262',
                            fontSize: 13,
                            alignSelf: 'center',
                            marginLeft: 10,
                            lineHeight: 23,
                        }}
                    >
                        SIGNUP WITH EMAIL
                    </Text>
                </View>
            );
        }}
        onPress={() => {
            props.onLoginButtonPress();
        }}
    />
);

export default EmailLogin;
