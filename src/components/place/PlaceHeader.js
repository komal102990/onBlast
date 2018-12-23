import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { Icon } from 'native-base';
import { Theme } from 'src/styles';
import {
    AnButton,
} from 'src/components/common';
import Images from '@assets';

export default class PlaceHeader extends Component {
    render() {
        return (
            <View
                style={{
                    display: 'flex',
                    height: 300,
                }}
            >
                <Image
                    style={{
                        width: Dimensions.get('window').width,
                        height: 300,
                    }}
                    size="cover"
                    source={Images.userProfileBack}
                />

                <View
                    style={{
                        position: 'absolute',
                        width: Dimensions.get('window').width,
                        bottom: 0,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.75)',
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 90,
                        }}
                    >
                        <View
                            style={{
                                paddingLeft: 10,
                                paddingRight: 10,
                                paddingTop: 10,
                                paddingBottom: 10,
                                flex: 1,
                                justifyContent: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 5,
                                }}
                            >
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={{
                                        fontFamily: Theme.Fonts.MyriadProRegular,
                                        fontSize: 20,
                                        flex: 1,
                                        color: '#484848',
                                    }}
                                >
                                    {this.props.place.name}
                                </Text>
                                <AnButton
                                    buttonStyle={{
                                        ...Theme.Buttons.Primary,
                                        marginTop: -10,
                                        minHeight: 6,
                                        height: 30,
                                        paddingLeft: 15,
                                        paddingRight: 15,
                                        borderRadius: 0,
                                        borderBottomLeftRadius: 5,
                                        borderBottomRightRadius: 5,
                                        paddingTop: 2,
                                        paddingBottom: 2,
                                    }}
                                    buttonTextStyle={{
                                        ...Theme.Buttons.Text.Primary,
                                        fontFamily: Theme.Fonts.MyriadProRegular,
                                        fontSize: 13,
                                        textAlign: 'center',
                                        width: 60,
                                    }}
                                    buttonTextLabel={(this.props.follow) ? 'Unfan' : 'Fan'}
                                    onPress={() => {
                                        if (this.props.follow) {
                                            this.props.onUnfollowClicked();
                                        } else {
                                            this.props.onFollowClicked();
                                        }
                                    }}
                                />
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Icon
                                        style={{
                                            fontSize: 38,
                                            color: '#6E6E6E',
                                            width: 45,
                                            textAlign: 'left',
                                        }}
                                        name="ios-megaphone-outline"
                                    />

                                    <View
                                        style={{
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: Theme.Fonts.MyriadProRegular,
                                                fontSize: 11,
                                                color: '#282828',

                                            }}
                                        >
                                            Blasts
                                        </Text>

                                        <Text
                                            style={{
                                                fontFamily: Theme.Fonts.HelveticaNeueMedium,
                                                fontSize: 15,
                                                color: '#282828',
                                                lineHeight: 17,
                                            }}
                                        >
                                            {this.props.place.blasts}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Icon
                                        style={{
                                            fontSize: 45,
                                            color: '#6E6E6E',
                                            width: 50,
                                            textAlign: 'left',
                                        }}
                                        type="EvilIcons"
                                        name="user"
                                    />

                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: Theme.Fonts.MyriadProRegular,
                                                fontSize: 11,
                                                color: '#282828',
                                            }}
                                        >
                                            Fans
                                        </Text>

                                        <Text
                                            style={{
                                                fontFamily: Theme.Fonts.HelveticaNeueMedium,
                                                fontSize: 15,
                                                color: '#282828',
                                                lineHeight: 17,
                                            }}
                                        >
                                            {this.props.place.fans}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Icon
                                        style={{
                                            fontSize: 45,
                                            color: '#6E6E6E',
                                            width: 50,
                                            textAlign: 'left',
                                        }}
                                        type="EvilIcons"
                                        name="heart"
                                    />
                                    <View
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: Theme.Fonts.MyriadProRegular,
                                                fontSize: 11,
                                                color: '#282828',
                                            }}
                                        >
                                            Views
                                        </Text>

                                        <Text
                                            style={{
                                                fontFamily: Theme.Fonts.HelveticaNeueMedium,
                                                fontSize: 15,
                                                color: '#282828',
                                                lineHeight: 17,
                                            }}
                                        >
                                            {this.props.place.views}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
