import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Icon } from 'native-base';
import { AnTouchable } from 'src/components/common';
import { Theme } from 'src/styles';

const styles = StyleSheet.create({
    aa: {
        padding: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ab: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ac: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: '#ccc',
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.Colors.Primary,
    },
    ad: {
        fontSize: 30,
        color: '#fff',
    },
    ae: {
        flex: 1,
        justifyContent: 'space-around',
        marginLeft: 10,
    },
    af: {
        fontFamily: Theme.Fonts.RobotoRegular,
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
                    <View
                        style={styles.ac}
                    >
                        <Icon
                            style={styles.ad}
                            type="Entypo"
                            name="location-pin"
                        />
                    </View>

                    <View
                        style={styles.ae}
                    >
                        <View>
                            <Text
                                style={styles.af}
                            >
                                {this.props.name}
                            </Text>
                        </View>
                    </View>
                </View>
            </AnTouchable>
        );
    }
}
