import React, { Component } from 'react';
import { Text, Animated } from 'react-native';
import { Theme } from 'src/styles';

export default class AnAlertBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            offsetX: new Animated.Value(200),
        };
    }

    getTypeStyles(type) {
        switch (type) {
        case 'success': {
            return {
                backgroundColor: Theme.Colors.Primary,
                color: '#fff',
                ...this.props.successTypeStyle,
            };
        }

        case 'error': {
            return {
                backgroundColor: '#dd5b5b',
                color: '#fff',
                ...this.props.errorTypeStyle,
            };
        }
        default:
            return {
                backgroundColor: Theme.Colors.Primary,
                color: '#fff',
                ...this.props.successTypeStyle,
            };
        }
    }

    show(params) {
        this.setState({
            ...params,
            ...this.getTypeStyles(params.type),
        });

        Animated.timing(this.state.offsetX, {
            toValue: 0,
            duration: 700,
        }).start(() => {
            setTimeout(() => {
                Animated.timing(this.state.offsetX, {
                    toValue: 200,
                    duration: 700,
                }).start();
            }, this.state.delay);
        });
    }

    render() {
        return (
            <Animated.View
                style={{
                    transform: [{
                        translateY: this.state.offsetX,
                    }],
                    backgroundColor: this.state.backgroundColor,
                    minHeight: 50,
                    width: '100%',
                    position: 'absolute',
                    bottom: this.props.bottom || 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 5,
                    zIndex: 10,
                }}
            >
                <Text
                    style={{
                        color: this.state.color,
                        textAlign: 'center',
                    }}
                >
                    { this.state.message }
                </Text>
            </Animated.View>
        );
    }
}
