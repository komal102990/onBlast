import React, { PureComponent } from 'react';
import { Image, StyleSheet } from 'react-native';
import { View, Text } from 'native-base';
import { AnTouchable } from 'src/components/common';
import Images from '@assets';
import { Theme } from 'src/styles';

const styles = StyleSheet.create({
    aa: {
        padding: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    ab: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ac: {
        borderRadius: 20,
        borderColor: '#ccc',
        borderWidth: 0,
        width: 40,
        height: 40,
    },
    ad: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'space-around',
    },
    ae: {
        fontFamily: Theme.Fonts.RobotoRegular,
    },
    af: {
        fontFamily: Theme.Fonts.RobotoRegular,
        color: '#b1b1b1',
        fontSize: 11,
    },
});

export default class SearchPlaceResult extends PureComponent {
    constructor(props) {
        super(props);

        this.onResultClicked = this.props.onResultClicked.bind(this);
    }
    render() {
        return (
            <AnTouchable
                activeOpacity={0.6}
                style={styles.aa}
                onPress={this.onResultClicked}
            >
                <View
                    style={styles.ab}
                >
                    <View>
                        <Image
                            style={styles.ac}
                            resizeMode="cover"
                            source={Images.face}
                        />
                    </View>

                    <View
                        style={styles.ad}
                    >
                        <View>
                            <Text
                                style={styles.ae}
                            >
                                {this.props.name}
                            </Text>
                        </View>

                        <View>
                            <Text
                                style={styles.af}
                            >
                                {this.props.place}
                            </Text>
                        </View>
                    </View>
                </View>
            </AnTouchable>
        );
    }
}
