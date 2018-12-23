import React, { PureComponent } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { Navigation } from 'react-native-navigation';
import {
    AnTouchable,
} from 'src/components/common';

const styles = StyleSheet.create({
    aa: {
        flexGrow: 1,
        justifyContent: 'center',
        width: 50,
        height: 30,
        alignItems: (Platform.OS === 'android') ? 'center' : 'flex-end',
    },
    ab: {
        color: '#fff',
        fontSize: 30,
    },
});

export default class SearchButton extends PureComponent {
    constructor(props) {
        super(props);

        this.onPress = (typeof this.props.onPress === 'function') ? this.props.onPress.bind(this) : null;
    }

    render() {
        return (
            <AnTouchable
                activeOpacity={0.6}
                style={styles.aa}
                onPress={this.onPress}
            >
                <Icon
                    style={styles.ab}
                    name="ios-search-outline"
                />
            </AnTouchable>
        );
    }
}

Navigation.registerComponent('SearchButton', () => SearchButton);
