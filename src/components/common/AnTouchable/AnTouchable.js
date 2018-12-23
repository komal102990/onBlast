import React from 'react';
import {
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from 'react-native';
import throttle from 'src/utils/throttle';

const AnTouchable = (props) => {
    const callable = throttle(props.onPress, 1000);

    return (Platform.OS === 'android') ?
        (
            <TouchableOpacity
                {...props}
                onPress={() => {
                    callable();
                }}
                onLongPress={() => {
                    callable();
                }}
            >
                {props.children}
            </TouchableOpacity>
        ) : (
            <TouchableOpacity
                {...props}
                onPress={() => {
                    callable();
                }}
                onLongPress={() => {
                    callable();
                }}
            >
                {props.children}
            </TouchableOpacity>
        );
};

export default AnTouchable;
