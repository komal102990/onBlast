import React, { Component } from 'react';
import { BackHandler, Platform, Dimensions, Keyboard } from 'react-native';
import { View } from 'native-base';
import { AnInput, AnButton } from 'src/components/common';
import { Theme } from 'src/styles';
import { isIphoneX } from 'react-native-iphone-x-helper';

const { height } = Dimensions.get('window');

class SelectBlastCaptionModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height,
            caption: this.props.caption || '',
        };

        this.onChangeText = this.onChangeText.bind(this);
        this.onRequestClose = this.props.onRequestClose.bind(this);
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            this.backHandlerListener = BackHandler.addEventListener('hardwareBackPress', () => {
                this.onRequestClose();

                return true;
            });
        }
    }

    componentDidMount() {
        this.props.navigator.setTitle({
            title: this.props.title,
        });

        this.props.navigator.setButtons({
            rightButtons: [
                {
                    id: 'close-button',
                    component: 'CloseButton', // This line loads our component as a nav bar button item
                    passProps: {
                        onPress: () => {
                            this.onRequestClose();
                        },
                    },
                },
            ],
        });

        const eventshow = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
        const eventhide = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

        this.keyboardDidShowListener = Keyboard.addListener(eventshow, (e) => {
            this.setState({
                height: height - e.endCoordinates.height - 10,
            });
        });

        this.keyboardDidHideListener = Keyboard.addListener(eventhide, () => {
            this.setState({
                height,
            });
        });

        setTimeout(() => {
            this.inputRef.focus();
        }, 500);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();

        if (this.backHandlerListener) this.backHandlerListener.remove();
    }

    onChangeText(caption) {
        this.setState({
            caption,
        });
    }

    render() {
        return (
            <View
                style={{
                    height: this.state.height,
                    backgroundColor: '#fff',

                }}
            >
                <View
                    style={{
                        padding: 0,
                    }}
                >
                    <View>
                        <AnInput
                            value={this.state.caption}
                            refcb={(ref) => {
                                this.inputRef = ref;
                            }}
                            placeholder="What are you thinking ?"
                            placeholderTextColor={Theme.Colors.Primary}
                            autoCorrect={false}
                            formControlStyles={{
                                marginTop: 10,
                                marginBottom: 0,
                            }}
                            multiline
                            customStyles={{
                                fontFamily: Theme.Fonts.HelveticaNeueLight,
                                backgroundColor: '#fff',
                                padding: 5,
                                color: '#000',
                                textAlign: 'left',
                                textAlignVertical: 'top',
                                borderBottomWidth: 0,
                                fontSize: 17,
                                height: (Platform.OS === 'android') ?
                                    this.state.height - 40 - 100 : (isIphoneX()) ?
                                        this.state.height - 40 - 108 : this.state.height - 40 - 84,
                            }}

                            onChangeText={this.onChangeText}

                            autoCapitalize="none"
                        />

                        <AnButton
                            buttonStyle={{
                                ...Theme.Buttons.Primary,
                                borderRadius: 0,
                            }}
                            additionalButtonProps={{
                                block: true,
                                large: true,
                            }}
                            buttonTextStyle={{
                                ...Theme.Buttons.Text.Primary,
                                fontSize: 18,
                                lineHeight: 22,
                            }}
                            buttonTextLabel="APPLY"
                            onPress={this.props.onSelectCaption.bind(this, this.state.caption)}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export default SelectBlastCaptionModal;
