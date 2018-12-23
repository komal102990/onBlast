import React, { PureComponent } from 'react';
import { ActivityIndicator } from 'react-native';
import {
    View,
    Text,
    Icon,
} from 'native-base';
import {
    AnInput,
    AnTouchable,
} from 'src/components/common';
import Switch from 'react-native-customisable-switch';
import { Theme } from 'src/styles';

export default class BlastFormBoxA extends PureComponent {
    render() {
        console.log(this.props);
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        position: 'relative',
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: '#ffffffde',
                                width: 310,
                                borderRadius: 18,
                            }}
                        >
                            <View
                                style={{
                                    padding: 20,
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: Theme.Fonts.HelveticaNeueLight,
                                            fontSize: 16,
                                            marginBottom: 10,
                                        }}
                                    >
                                        Who are you blasting ? *
                                    </Text>

                                    <View
                                        style={{
                                            backgroundColor: '#fff',
                                            borderRadius: 25,
                                            borderColor: '#cccccc',
                                            borderWidth: 1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: 10,
                                        }}
                                    >
                                        <Icon
                                            name="search"
                                            style={{
                                                width: 25,
                                                textAlign: 'center',
                                                fontSize: 23,
                                                height: 20,
                                                marginRight: 5,
                                            }}
                                        />

                                        <View
                                            style={{
                                                flex: 1,
                                            }}
                                        >
                                            <AnInput
                                                placeholderTextColor="#fff"

                                                formControlStyles={{
                                                    marginTop: 0,
                                                    marginBottom: 0,
                                                }}
                                                onFocus={() => {
                                                    this.props.onPlaceExpandedComponent();
                                                }}
                                                customStyles={{
                                                    fontFamily: Theme.Fonts.HelveticaNeueLight,
                                                    height: 25,
                                                    color: '#000',
                                                    textAlign: 'left',
                                                    borderBottomWidth: 0,
                                                    fontSize: 14,
                                                }}

                                                value={this.props.place.label}

                                                autoCapitalize="none"
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        marginTop: 30,
                                        marginBottom: 30,
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: Theme.Fonts.HelveticaNeueLight,
                                            fontSize: 16,
                                            marginBottom: 10,
                                        }}
                                    >
                                        Your Experience
                                    </Text>

                                    <View
                                        style={{
                                            width: 240,
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <View
                                            style={{
                                                alignItems: 'center',
                                                width: 70,
                                            }}
                                        >
                                            <Icon
                                                type="Foundation"
                                                name="like"
                                                style={{
                                                    fontSize: 35,
                                                    color: '#44ae4c',
                                                }}
                                            />
                                        </View>

                                        <Switch
                                            value={!this.props.like}
                                            onChangeValue={(value) => {
                                                this.props.onChangeLike(value);
                                            }}
                                            fontSize={16}
                                            activeBackgroundColor={Theme.Colors.Primary}
                                            inactiveBackgroundColor={Theme.Colors.Primary}
                                            activeButtonBackgroundColor="#fff"
                                            inactiveButtonBackgroundColor="#fff"
                                            switchWidth={100}
                                            switchHeight={40}
                                            switchBorderRadius={30}
                                            buttonWidth={35}
                                            buttonHeight={35}
                                            buttonBorderRadius={17.5}
                                            buttonBorderColor="#fff"
                                            buttonBorderWidth={10}
                                            animationTime={100}
                                            padding
                                        />

                                        <View
                                            style={{
                                                alignItems: 'center',
                                                width: 70,
                                            }}
                                        >
                                            <Icon
                                                type="Foundation"
                                                name="like"
                                                style={{
                                                    color: '#cc1a1c',
                                                    fontSize: 35,
                                                    transform: [{
                                                        rotate: '180deg',
                                                    }],
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: Theme.Fonts.HelveticaNeueLight,
                                            fontSize: 16,
                                            marginBottom: 10,
                                        }}
                                    >
                                        Caption
                                    </Text>

                                    <View
                                        style={{
                                            backgroundColor: '#fff',
                                            borderColor: '#cccccc',
                                            borderWidth: 1,
                                            borderRadius: 25,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            padding: 8,
                                        }}
                                    >
                                        <View
                                            style={{
                                                flex: 1,
                                            }}
                                        >
                                            <AnInput
                                                placeholderTextColor="#fff"

                                                formControlStyles={{
                                                    marginTop: 0,
                                                    marginBottom: 0,
                                                }}
                                                customStyles={{
                                                    fontFamily: Theme.Fonts.HelveticaNeueLight,
                                                    height: 25,
                                                    color: '#000',
                                                    textAlign: 'center',
                                                    borderBottomWidth: 0,
                                                    fontSize: 14,
                                                }}

                                                onFocus={() => {
                                                    this.props.onCaptionExpandedComponent();
                                                }}

                                                value={this.props.caption}

                                                autoCapitalize="none"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {(this.props.blastButton && (
                                <AnTouchable
                                    disabled={this.props.place.id === null || this.props.place.id === undefined}
                                    style={{
                                        backgroundColor: (this.props.place.id === null || this.props.place.id === undefined) ? '#ccc' : Theme.Colors.Primary,
                                        borderBottomRightRadius: 18,
                                        borderBottomLeftRadius: 18,
                                        paddingTop: 16,
                                        paddingBottom: 16,
                                    }}
                                    onPress={() => {
                                        this.props.onBlast();
                                    }}
                                >
                                    {(this.props.uploading) ? (
                                        <ActivityIndicator
                                            color="#fff"
                                        />
                                    ) : (
                                        <Text
                                            style={{
                                                fontFamily: Theme.Fonts.HelveticaNeueLight,
                                                fontSize: 16,
                                                color: '#fff',
                                                textAlign: 'center',
                                            }}
                                        >
                                            Blast
                                        </Text>
                                    )}
                                </AnTouchable>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
