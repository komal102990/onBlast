import React, { PureComponent } from 'react';
import Images from '@assets';
import {
    Image,
    StyleSheet,
} from 'react-native';
import {
    View,
    Text,
    Icon,
} from 'native-base';
import {
    AnTouchable,
} from 'src/components/common';
import {
    Theme,
} from 'src/styles';

const styles = StyleSheet.create({
    aa: {
        height: 72,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#00000090',
    },
    ab: {
        flexDirection: 'row',
    },
    ac: {
        padding: 6,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingRight: 180,
    },
    ad: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#fff',
    },
    ae: {
        marginLeft: 8,
    },
    af: {
        fontFamily: Theme.Fonts.MyriadProRegular,
        color: '#fff',
        fontSize: 17,
    },
    ag: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    ah: {
        fontSize: 16,
        height: 22,
        color: Theme.Colors.Primary,
    },
    ai: {
        fontFamily: Theme.Fonts.MyriadProRegular,
        marginLeft: 5,
        color: '#ccc',
        fontSize: 16,
        flex: 1,
    },
    aj: {
        fontFamily: Theme.Fonts.MyriadProRegular,
        color: '#fff',
        fontSize: 12,
    },
});

class ReviewSingleItemInfoBar extends PureComponent {
    constructor(props) {
        super(props);

        this.onProfilePress = this.props.onProfilePress.bind(this, props.reviewerId);
        this.onPlacePress = this.props.onPlacePress.bind(this, props.placeId);
    }

    render() {
        return (
            <View
                style={styles.aa}
            >
                <View
                    style={styles.ab}
                >
                    <View
                        style={styles.ac}
                    >
                        <AnTouchable
                            onPress={this.onProfilePress}
                        >
                            {
                                (this.props.reviewerAvatar !== null &&
                                    this.props.reviewerAvatar !== undefined &&
                                    this.props.reviewerAvatar !== '') ? (
                                        <Image
                                            style={styles.ad}
                                            source={{ uri: this.props.reviewerAvatar }}
                                        />
                                    ) : (
                                        <Image
                                            style={styles.ad}
                                            source={Images.defaultUser}
                                        />
                                    )
                            }
                        </AnTouchable>

                        <View
                            style={styles.ae}
                        >
                            <AnTouchable
                                onPress={this.onProfilePress}
                            >
                                <Text
                                    ellipsizeMode="tail"
                                    numberOfLines={1}
                                    style={styles.af}
                                >
                                    { this.props.reviewerName }
                                </Text>
                            </AnTouchable>

                            <AnTouchable
                                onPress={this.onPlacePress}
                            >
                                <View
                                    style={styles.ag}
                                >
                                    <Icon
                                        type="Ionicons"
                                        name="ios-pin"
                                        style={styles.ah}
                                    />
                                    <Text
                                        ellipsizeMode="tail"
                                        numberOfLines={1}
                                        style={styles.ai}
                                    >
                                        { this.props.placeName }
                                    </Text>
                                </View>
                            </AnTouchable>

                            <Text
                                style={styles.aj}
                            >
                                { this.props.views } Views
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default ReviewSingleItemInfoBar;
