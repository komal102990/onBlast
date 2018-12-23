import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import { View, Icon } from 'native-base';
import { Theme } from 'src/styles';
import { AnButton } from 'src/components/common';

const GoogleLogin = props => (
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
            large: false,
            rounded: true,
        }}
        buttonContent={(loading) => {
            if (loading) {
                return (
                    <ActivityIndicator
                        color="#d34836"
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
                        type="Zocial"
                        name="google"
                        style={{
                            color: '#d34836',
                            marginLeft: 10,
                            fontSize: 23,
                        }}
                    />

                    <Text
                        style={{
                            fontFamily: Theme.Fonts.MyriadProRegular,
                            fontSize: 16,
                            color: '#d34836',
                            alignSelf: 'center',
                            marginLeft: 10,
                            flex: 1,
                            lineHeight: 30,
                        }}
                    >
                        SIGNUP WITH GOOGLE
                    </Text>
                </View>
            );
        }}
        onPress={() => {
            props.onLoginButtonPress();
        }}
    />
);

export default GoogleLogin;
