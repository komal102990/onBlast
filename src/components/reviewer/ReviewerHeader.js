import React, { Component } from 'react';
import { Image, Dimensions, StyleSheet } from 'react-native';
import { Text, View, Icon } from 'native-base';
import { Theme } from 'src/styles';
import {
    AnButton,
} from 'src/components/common';
import Images from '@assets';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    aa: {
        display: 'flex',
        height: 300,
    },
    ab: {
        width,
        height: 300,
    },
    ac: {
        width,
        height: 300,
    },
    ad: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ae: {
        fontFamily: Theme.Fonts.HelveticaNeueLight,
        paddingLeft: 20,
        paddingRight: 20,
        color: '#fff',
    },
    af: {
        position: 'absolute',
        zIndex: 9,
        bottom: 40,
        left: 10,
        borderRadius: 35,
        borderColor: '#fff',
        borderWidth: 4,
        width: 70,
        height: 70,
    },
    ag: {
        position: 'absolute',
        width,
        bottom: 0,
    },
    ah: {
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        flexDirection: 'row',
        alignItems: 'center',
        height: 90,
    },
    ai: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
    },
    aj: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    ak: {
        fontFamily: Theme.Fonts.MyriadProRegular,
        fontSize: 20,
        flex: 1,
        color: '#484848',
    },
    al: {
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
    },
    am: {
        fontFamily: Theme.Fonts.MyriadProRegular,
        fontSize: 13,
        textAlign: 'center',
        width: 60,
    },
    an: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ao: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    ap: {
        fontSize: 38,
        color: '#6E6E6E',
        width: 45,
        textAlign: 'left',
    },
    aq: {
        flexDirection: 'column',
    },
    ar: {
        fontFamily: Theme.Fonts.MyriadProRegular,
        fontSize: 11,
        color: '#282828',
    },
    as: {
        fontFamily: Theme.Fonts.HelveticaNeueMedium,
        fontSize: 15,
        color: '#282828',
        lineHeight: 17,
    },
    at: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    au: {
        fontSize: 45,
        color: '#6E6E6E',
        width: 50,
        textAlign: 'left',
    },
    av: {
        display: 'flex',
        flexDirection: 'column',
    },
    aw: {
        fontFamily: Theme.Fonts.MyriadProRegular,
        fontSize: 11,
        color: '#282828',
    },
    ax: {
        fontFamily: Theme.Fonts.HelveticaNeueMedium,
        fontSize: 15,
        color: '#282828',
        lineHeight: 17,
    },
    ay: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    az: {
        fontSize: 45,
        color: '#6E6E6E',
        width: 50,
        textAlign: 'left',
    },
    ba: {
        display: 'flex',
        flexDirection: 'column',
    },
    bb: {
        fontFamily: Theme.Fonts.MyriadProRegular,
        fontSize: 11,
        color: '#282828',
    },
    bc: {
        fontFamily: Theme.Fonts.HelveticaNeueMedium,
        fontSize: 15,
        color: '#282828',
        lineHeight: 17,
    },
});

export default class ReviewerHeader extends Component {
    constructor(props) {
        super(props);

        this.onToggleFollow = this.onToggleFollow.bind(this);
        this.onEditClicked = this.props.onEditClicked.bind(this);
    }

    onToggleFollow() {
        if (this.props.follow) {
            this.props.onUnfollowClicked();
        } else {
            this.props.onFollowClicked();
        }
    }

    render() {
        return (
            <View
                style={styles.aa}
            >
                {
                    (this.props.reviewer.backgroundImage !== null &&
                        this.props.reviewer.backgroundImage !== undefined &&
                        this.props.reviewer.backgroundImage !== '') ? (
                            <Image
                                style={styles.ab}
                                size="cover"
                                source={{ uri: this.props.reviewer.backgroundImage }}
                            />
                        ) : (
                            <Image
                                style={styles.ac}
                                size="cover"
                                source={Images.userProfileBack}
                            />
                        )
                }

                {/* <View
                    style={styles.ad}
                >

                    <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.ae}
                    >
                        {(this.props.reviewer.place) ? this.props.reviewer.place.label : ''}
                    </Text>
                </View> */}

                {/* {
                    (this.props.reviewer.avatar !== null &&
                        this.props.reviewer.avatar !== undefined &&
                        this.props.reviewer.avatar !== '') ? (
                            <Image
                                style={styles.af}
                                source={{ uri: this.props.reviewer.avatar }}
                            />
                        ) : (
                            <Image
                                style={styles.af}
                                source={Images.defaultUser}
                            />
                        )
                } */}

                <View
                    style={styles.ag}
                >
                    <View
                        style={styles.ah}
                    >
                        <View
                            style={styles.ai}
                        >
                            <View
                                style={styles.aj}
                            >
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    style={styles.ak}
                                >
                                    {this.props.reviewer.name} {this.props.reviewer.surname}
                                </Text>
                                {
                                    (this.props.me) ? (
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
                                            buttonTextLabel="Edit"
                                            onPress={this.onEditClicked}
                                        />
                                    ) : (
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
                                            onPress={this.onToggleFollow}
                                        />
                                    )
                                }
                            </View>

                            <View
                                style={styles.an}
                            >
                                <View
                                    style={styles.ao}
                                >
                                    <Icon
                                        style={styles.ap}
                                        name="ios-megaphone-outline"
                                    />

                                    <View
                                        style={styles.aq}
                                    >
                                        <Text
                                            style={styles.ar}
                                        >
                                            Blasts
                                        </Text>

                                        <Text
                                            style={styles.as}
                                        >
                                            {this.props.reviewer.my_blasts}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={styles.at}
                                >
                                    <Icon
                                        style={styles.au}
                                        type="EvilIcons"
                                        name="user"
                                    />

                                    <View
                                        style={styles.av}
                                    >
                                        <Text
                                            style={styles.aw}
                                        >
                                            Viewers
                                        </Text>

                                        <Text
                                            style={styles.ax}
                                        >
                                            {this.props.reviewer.my_viewers}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={styles.ay}
                                >
                                    <Icon
                                        style={styles.az}
                                        type="EvilIcons"
                                        name="heart"
                                    />
                                    <View
                                        style={styles.ba}
                                    >
                                        <Text
                                            style={styles.bb}
                                        >
                                            Views
                                        </Text>

                                        <Text
                                            style={styles.bc}
                                        >
                                            {this.props.reviewer.my_views}
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
