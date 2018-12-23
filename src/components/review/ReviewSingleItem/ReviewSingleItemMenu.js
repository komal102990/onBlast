import React, { PureComponent } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
} from 'react-native';
import {
    AnTouchable,
} from 'src/components/common';
import {
    View,
    Icon,
    Text,
} from 'native-base';
import {
    Theme,
} from 'src/styles';
import Share from 'react-native-share';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    aa: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 1,
        height: (height / 2),
        justifyContent: 'flex-end',
    },
    ab: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 1,
        height: (height / 2),
    },
    ac: {
        flex: 1,
        backgroundColor: Theme.Colors.Primary,
        width: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#00000050',
    },
    ad: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ae: {
        alignItems: 'center',
    },
    af: {
        fontSize: 30,
        color: '#fff',
    },
    ag: {
        fontFamily: Theme.Fonts.RobotoRegular,
        fontSize: 11,
        color: '#fff',
    },
    ah: {
        flex: 1,
        backgroundColor: Theme.Colors.Primary,
        width: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#00000050',
    },
    ai: {
        width: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    aj: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ak: {
        fontSize: 30,
        color: '#fff',
    },
    al: {
        flex: 1,
        backgroundColor: Theme.Colors.Primary,
        width: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#00000050',
    },
    am: {
        flex: 1,
        backgroundColor: Theme.Colors.Primary,
        width: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#00000050',
        justifyContent: 'center',
        alignItems: 'center',
    },
    an: {
        fontSize: 30,
        color: '#fff',
    },
    ao: {
        height: 72,
        backgroundColor: Theme.Colors.Primary,
        width: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#00000050',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ap: {
        fontSize: 20,
        color: '#fff',
    },
    aq: {
        height: 72,
        width: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#00000050',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ar: {
        fontSize: 20,
        color: '#fff',
    },
});

class ReviewSingleItemMenu extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            offsetX: new Animated.Value(50),
        };

        this.onMessagesClicked = this.props.onMessagesClicked.bind(this, this.props.reviewId);
        this.onShare = this.onShare.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onOpen = this.onOpen.bind(this);
    }

    onShare() {
        Share.open({
            title: 'Checkout this Blast!',
            message: 'Checkout this Blast!',
            url: this.props.videoUrl,
            subject: 'Checkout this Blast!',
        });
    }

    onOpen() {
        Animated.timing(this.state.offsetX, {
            toValue: 0,
            duration: 300,
        }).start();
    }

    onClose() {
        Animated.timing(this.state.offsetX, {
            toValue: 50,
            duration: 300,
        }).start();
    }

    render() {
        return (
            <View
                style={styles.aa}
            >
                <Animated.View
                    style={[styles.ab, {
                        transform: [{
                            translateX: this.state.offsetX,
                        }],
                    }]}
                >
                    <View
                        style={styles.ac}
                    >
                        <AnTouchable
                            activeOpacity={0.6}
                            style={styles.ad}
                            onPress={() => {
                                // Nothing to do ...
                            }}
                        >
                            <View
                                style={styles.ae}
                            >
                                <Icon
                                    type="Entypo"
                                    name="heart"
                                    style={styles.af}
                                />

                                <Text
                                    style={styles.ag}
                                >
                                    {this.props.likes}
                                </Text>
                            </View>
                        </AnTouchable>
                    </View>

                    {
                        (this.props.messagesButton) ? (
                            <View
                                style={styles.ah}
                            >
                                <View
                                    style={styles.ai}
                                >
                                    <AnTouchable
                                        activeOpacity={0.6}
                                        style={styles.aj}
                                        onPress={this.onMessagesClicked}
                                    >
                                        <View>
                                            <Icon
                                                type="MaterialIcons"
                                                name="chat-bubble-outline"
                                                style={styles.ak}
                                            />
                                        </View>
                                    </AnTouchable>
                                </View>
                            </View>
                        ) : null
                    }

                    <View
                        style={styles.al}
                    >
                        <AnTouchable
                            activeOpacity={0.6}
                            style={styles.am}
                            onPress={this.onShare}
                        >
                            <View>
                                <Icon
                                    type="Feather"
                                    name="map"
                                    style={styles.an}
                                />
                            </View>
                        </AnTouchable>
                    </View>

                    <View
                        style={styles.al}
                    >
                        <AnTouchable
                            activeOpacity={0.6}
                            style={styles.am}
                            onPress={this.onShare}
                        >
                            <View>
                                <Icon
                                    type="EvilIcons"
                                    name="share-google"
                                    style={styles.an}
                                />
                            </View>
                        </AnTouchable>
                    </View>

                    <AnTouchable
                        activeOpacity={1}
                        style={styles.ao}
                        onPress={this.onClose}
                    >
                        <Icon
                            type="Entypo"
                            name="dots-three-horizontal"
                            style={styles.ap}
                        />
                    </AnTouchable>
                </Animated.View>

                <AnTouchable
                    style={styles.aq}
                    onPress={this.onOpen}
                >
                    <Icon
                        type="Entypo"
                        name="dots-three-vertical"
                        style={styles.ar}
                    />
                </AnTouchable>
            </View>
        );
    }
}

export default ReviewSingleItemMenu;
