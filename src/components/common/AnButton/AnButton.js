import React from 'react';
import {
    Text,
    ActivityIndicator,
    Keyboard,
} from 'react-native';
import {
    Button,
} from 'native-base';
import throttle from 'src/utils/throttle';

const AnButton = (props) => {
    const callable = throttle(props.onPress, 1000);

    return (
        <Button
            {...props.additionalButtonProps}
            style={{
                ...props.buttonStyle,
            }}
            onPress={() => {
                if (!props.loading) {
                    callable();

                    Keyboard.dismiss();
                }
            }}
            onLongPress={() => {
                if (!props.loading) {
                    callable();

                    Keyboard.dismiss();
                }
            }}
        >
            {
                (typeof props.buttonContent === 'function') ?
                    props.buttonContent(props.loading)

                    :

                    (props.loading) ?
                        (
                            <ActivityIndicator
                                color="#fff"
                            />
                        ) : (
                            <Text
                                style={{
                                    ...props.buttonTextStyle,
                                }}
                            >
                                {props.buttonTextLabel}
                            </Text>
                        )
            }
        </Button>
    );
};

export default AnButton;
