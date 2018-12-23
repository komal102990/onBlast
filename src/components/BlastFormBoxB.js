import React, { PureComponent } from 'react';
import {
    View,
    Text,
} from 'native-base';
import Switch from 'react-native-customisable-switch';
import { Theme } from 'src/styles';

export default class BlastFormBoxB extends PureComponent {
    render() {
        return (
            <View
                style={{
                    marginBottom: 15,
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#fff',
                    width: 210,
                    alignItems: 'center',
                    paddingBottom: 10,
                    flexDirection: 'row',
                }}
            >
                {(this.props.switch) ? (
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                alignItems: 'center',
                                width: 70,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: Theme.Fonts.HelveticaNeueLight,
                                    color: '#fff',
                                    fontSize: 14,
                                }}
                            >
                            onBlast
                            </Text>
                        </View>
                            
                        <Switch
                            value={this.props.type}
                            onChangeValue={() => {
                                this.props.onChangeType();
                            }}
                            fontSize={16}
                            activeBackgroundColor="#3cb878"
                            inactiveBackgroundColor="#3cb878"
                            activeButtonBackgroundColor="red"
                            inactiveButtonBackgroundColor="red"
                            switchWidth={70}
                            switchHeight={30}
                            switchBorderRadius={30}
                            switchBorderColor="rgba(0, 0, 0, 1)"
                            switchBorderWidth={0}
                            buttonWidth={25}
                            buttonHeight={25}
                            buttonBorderRadius={12.5}
                            buttonBorderColor="#fff"
                            buttonBorderWidth={8}
                            animationTime={100}
                            padding
                        />

                        <View
                            style={{
                                alignItems: 'center',
                                width: 90,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: Theme.Fonts.HelveticaNeueLight,
                                    color: '#fff',
                                    fontSize: 14,
                                }}
                            >
                                OnBlast Live
                            </Text>
                        </View>
                    </View>
                ) : (
                    <View
                        style={{
                            height: 30,
                        }}
                    />
                )}
            </View>
        );
    }
}
