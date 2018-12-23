import React, { PureComponent } from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { View, Button, Icon, Footer, FooterTab } from 'native-base';
import { Theme } from 'src/styles';
import { isIphoneX } from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
    aa: {
        height: 60,
    },
    ab: {
        position: 'absolute',
        bottom: 0,
        height: 70,
        paddingTop: 10,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        elevation: 0,
    },
    ac: {
        height: 10,
        backgroundColor: 'red',
    },
    ad: {
        position: 'absolute',
        top: 0,
        left: '50%',
        marginLeft: -35,
        zIndex: 100,
        backgroundColor: Theme.Colors.Primary,
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ae: {
        backgroundColor: Theme.Colors.Primary,
        padding: 10,
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    af: {
        textAlign: 'center',
        fontSize: 35,
        color: '#fff',
    },
    ag: {
        backgroundColor: Theme.Colors.Primary,
    },
    ah: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: (isIphoneX()) ? 20 : 0,
    },
    ai: {
        fontSize: 25,
        lineHeight: 35,
    },
});

class BottomTabs extends PureComponent {
    render() {
        return (
            <View
                style={styles.aa}
            >
                <Footer
                    style={styles.ab}
                >

                    <TouchableWithoutFeedback
                        style={styles.ac}
                        activeOpacity={1}
                        onPress={() => {
                            this.props.nav.push({
                                screen: 'CameraScreen',
                                animationType: 'fade',
                                backButtonTitle: '',
                                passProps: {
                                    onDismiss: () => {
                                        this.props.nav.pop({
                                            animationType: 'none',
                                        });
                                    },
                                },
                            });
                        }}
                    >
                        <View
                            style={styles.ad}
                        >
                            <View
                                style={styles.ae}
                            >
                                <Icon
                                    type="Feather"
                                    name="plus"
                                    style={styles.af}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <FooterTab
                        style={styles.ag}
                    >
                        <Button
                            onPress={() => {
                                this.props.nav.switchToTab({
                                    tabIndex: 0,
                                });
                            }}
                        >
                            <View
                                style={[styles.ah, {
                                    backgroundColor: (this.props.active === 0) ? '#fff' : 'transparent',
                                    borderWidth: (this.props.active === 0) ? 1 : 0,
                                }]}
                            >
                                <Icon
                                    type="Ionicons"
                                    name="ios-home-outline"
                                    style={[styles.ai, {
                                        color: (this.props.active === 0) ? Theme.Colors.Primary : '#fff',
                                    }]}
                                />
                            </View>
                        </Button>

                        <Button
                            onPress={() => {
                                this.props.nav.switchToTab({
                                    tabIndex: 1,
                                });
                            }}
                        >
                            <View
                                style={[styles.ah, {
                                    backgroundColor: (this.props.active === 1) ? '#fff' : 'transparent',
                                    borderWidth: (this.props.active === 1) ? 1 : 0,
                                }]}
                            >
                                <Icon
                                    type="EvilIcons"
                                    name="like"
                                    style={[styles.ai, {
                                        color: (this.props.active === 1) ? Theme.Colors.Primary : '#fff',
                                        fontSize: 30,
                                    }]}
                                />
                            </View>
                        </Button>

                        <View
                            style={{
                                width: 60,
                            }}
                        />

                        <Button
                            onPress={() => {
                                this.props.nav.switchToTab({
                                    tabIndex: 2,
                                });
                            }}
                        >
                            <View
                                style={[styles.ah, {
                                    backgroundColor: (this.props.active === 3) ? '#fff' : 'transparent',
                                    borderWidth: (this.props.active === 3) ? 1 : 0,
                                }]}
                            >
                                <Icon
                                    type="SimpleLineIcons"
                                    name="user"
                                    style={[styles.ai, {
                                        color: (this.props.active === 3) ? Theme.Colors.Primary : '#fff',
                                        fontSize: 20,
                                    }]}
                                />
                            </View>
                        </Button>

                        <Button
                            onPress={() => {
                                this.props.nav.switchToTab({
                                    tabIndex: 3,
                                });
                            }}
                        >
                            <View
                                style={[styles.ah, {
                                    backgroundColor: (this.props.active === 4) ? '#fff' : 'transparent',
                                    borderWidth: (this.props.active === 4) ? 1 : 0,
                                }]}
                            >
                                <Icon
                                    type="Ionicons"
                                    name="ios-megaphone-outline"
                                    style={[styles.ai, {
                                        color: (this.props.active === 4) ? Theme.Colors.Primary : '#fff',
                                    }]}
                                />
                            </View>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>
        );
    }
}

export default BottomTabs;
