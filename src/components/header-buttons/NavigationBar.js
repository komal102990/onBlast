import React, { PureComponent } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { View, Icon, Text } from 'native-base';
import { AnInput, AnTouchable } from 'src/components/common';
import { Theme } from 'src/styles';
import { Navigation } from 'react-native-navigation';

const styles = StyleSheet.create({
    aa: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 0 : 0,
    },
    ab: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },
    ac: {
        // flex: 1,
        // flexDirection: 'row',
        alignItems: 'center',
    },
    ad: {
        fontSize: 30,
        color: '#fff',
        width: 40,
    },
    ae: {
        flex: 1,
    },
    af: {
        fontFamily: Theme.Fonts.HelveticaNeueLight,
        height: 30,
        fontSize: 17,
        color: '#fff',
        textAlign: 'left',
        borderBottomWidth: 0,
        padding: 0,
    },
});

class NavigationBar extends PureComponent {
    constructor(props) {
        super(props);

        this.irefs = {};

        this.onBack = this.props.onBack.bind(this);
    }

    render() {
        return (
            <View
                style={styles.aa}
            >
                    <View
                        style={styles.ac}
                    >
                        <AnTouchable
                            onPress={this.onBack}
                        >
                            <Icon
                                type="EvilIcons"
                                name="close"
                                style={styles.ad}
                            />
                        </AnTouchable>
                    </View>

                    <View
                        style={{
                            maxWidth: 230,
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: Theme.Fonts.HelveticaNeueLight,
                                fontSize: 18,
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            Notifications
                        </Text>
                    </View>
            </View>
        );
    }
}

Navigation.registerComponent('NavigationBar', () => NavigationBar);
