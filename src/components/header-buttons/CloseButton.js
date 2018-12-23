import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Icon } from 'native-base';
import { Navigation } from 'react-native-navigation';

const styles = StyleSheet.create({
    aa: {
        flexGrow: 1,
        justifyContent: 'center',
        width: 50,
        height: 30,
        alignItems: (Platform.OS === 'android') ? 'flex-start' : 'flex-end',
    },
    ab: {
        color: '#fff',
        fontSize: 30,
    },
});
export default class CloseButton extends PureComponent {
    constructor(props) {
        super(props);

        this.onPress = (typeof this.props.onPress === 'function') ? this.props.onPress.bind(this) : null;
    }

    render() {
        return (
            <TouchableOpacity
                style={styles.aa}
                onPress={this.onPress}
            >
                <Icon
                    style={styles.ab}
                    type="EvilIcons"
                    name="close"
                />
            </TouchableOpacity>
        );
    }
}

Navigation.registerComponent('CloseButton', () => CloseButton);
