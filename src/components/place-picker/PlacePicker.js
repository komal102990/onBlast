import React, { Component } from 'react';
import {
    Modal,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
    TextInput,
} from 'react-native';
import {
    Icon,
} from 'native-base';
import { Theme } from 'src/styles';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

const Spinner = require('react-native-spinkit');

/**
 *  Set modal visible.
 *
 *  @param {boolean} visible - Boolean.
 */
function open(visible) {
    this.setState({
        modalVisible: visible,
    });
}

export default class PlacePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            modalVisible: false,
            options: null,
        };
    }

    renderControl() {
        return (
            <View>
                <View
                    style={{
                        borderBottomColor: '#fff',
                        borderBottomWidth: 1,
                    }}
                >
                    {
                        (this.props.label) ?
                            (
                                <Text
                                    style={{
                                        ...Theme.Forms.Label,
                                        ...this.props.labelStyles,
                                    }}
                                >
                                    { this.props.label }
                                </Text>
                            ) : null
                    }

                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {
                            open.call(this, !this.props.disabled);
                        }}
                    >
                        <TextInput
                            placeholderTextColor="#0000004c"
                            pointerEvents="box-none"
                            editable={false}
                            underlineColorAndroid="transparent"
                            style={{
                                ...Theme.Forms.Input,
                                fontFamily: Theme.Fonts.HelveticaNeueThin,
                                height: 30,
                                color: '#fff',
                                textAlign: 'left',
                                borderBottomWidth: 0,
                                padding: 0,
                                paddingBottom: 8,
                                fontSize: 20,
                                paddingRight: 20,
                            }}
                            value={
                                (this.props.place) ? this.props.place.label : this.props.placeholder
                            }
                        />

                        <View
                            style={{
                                position: 'absolute',
                                bottom: ((Theme.Forms.Input.height) / 2) - 10,
                                right: 5,
                                width: 0,
                                height: 0,
                                backgroundColor: 'transparent',
                                borderStyle: 'solid',
                                borderLeftWidth: 5,
                                borderRightWidth: 5,
                                borderTopWidth: 8,
                                borderLeftColor: 'transparent',
                                borderRightColor: 'transparent',
                                borderTopColor: '#fff',
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    renderSearchPicker() {
        return (
            <Modal
                animationType="slide"
                transparent
                enabled={this.props.enabled}
                visible={this.state.modalVisible}
            >
                <TouchableWithoutFeedback
                    style={{
                        flex: 1,
                        padding: 10,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: '#ffffff',
                            flex: 1,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: Theme.Colors.Primary,
                                    flexDirection: 'row',
                                    padding: 8,
                                    alignItems: 'center',
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: Theme.Fonts.RobotoRegular,
                                        flex: 1,
                                        fontSize: 22,
                                        color: '#fff',
                                        textAlign: 'left',
                                    }}
                                >
                                    {this.props.label || this.props.placeholder}
                                </Text>

                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingLeft: 10,
                                        paddingRight: 0,
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            options: null,
                                            modalVisible: false,
                                        });
                                    }}
                                >
                                    <Icon
                                        style={{
                                            fontSize: 40,
                                            color: '#fff',
                                            height: 30,
                                        }}
                                        type="EvilIcons"
                                        name="close"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#ccc',
                                    padding: 4,
                                }}
                            >
                                <View
                                    style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 8,
                                    }}
                                >
                                    <Icon
                                        type="EvilIcons"
                                        name="search"
                                        style={{
                                            height: 25,
                                            fontSize: 30,
                                            color: '#ccc',
                                        }}
                                    />
                                </View>

                                <TextInput
                                    placeholder="Find a place ..."
                                    underlineColorAndroid="transparent"
                                    style={{
                                        fontFamily: Theme.Fonts.RobotoRegular,
                                        flex: 1,
                                        padding: 10,
                                        textAlign: 'left',
                                        fontSize: 18,
                                    }}
                                    onChangeText={(text) => {
                                        this.setState({
                                            loading: (text) ? true : false, // eslint-disable-line
                                            options: null,
                                        });

                                        if (text === '') return;

                                        const request = new XMLHttpRequest();

                                        request.onreadystatechange = () => {
                                            if (request.readyState !== 4) {
                                                return;
                                            }

                                            if (request.status === 200) {
                                                const responseJSON = JSON
                                                    .parse(request.responseText);

                                                if (typeof responseJSON.predictions !== 'undefined') {
                                                    this.setState({
                                                        loading: false,
                                                        options: []
                                                            .concat(responseJSON.predictions),
                                                    });
                                                }
                                            }
                                        };

                                        request.open('GET', `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCH_Vv1cMkTEL3ADcBCDKBe9F9GZeTc-Hk&libraries=places&input=${encodeURIComponent(text)}`);

                                        request.send();
                                    }}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                />
                            </View>

                            {
                                (this.state.loading && (
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Spinner
                                            isVisible
                                            size={30}
                                            type="ThreeBounce"
                                            color={Theme.Colors.Primary}
                                        />
                                    </View>
                                ))
                            }

                            {
                                (!this.state.loading && this.state.options && (
                                    <KeyboardAwareFlatList
                                        keyExtractor={item => item.id}
                                        data={this.state.options}
                                        ListEmptyComponent={() => (
                                            <View
                                                style={{
                                                    alignItems: 'center',
                                                    marginTop: 30,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontFamily: Theme.Fonts.RobotoLight,
                                                        fontSize: 18,
                                                    }}
                                                >
                                                    No results found!
                                                </Text>
                                            </View>
                                        )}
                                        renderItem={({ item, separators }) => (
                                            <TouchableOpacity
                                                style={{
                                                    width: '100%',
                                                    padding: 15,
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: '#ccc',
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                                onShowUnderlay={separators.highlight}
                                                onHideUnderlay={separators.unhighlight}
                                                onPress={() => {
                                                    this.setState({
                                                        loading: true,
                                                    });

                                                    const request = new XMLHttpRequest();

                                                    request.onreadystatechange = () => {
                                                        if (request.readyState !== 4) {
                                                            return;
                                                        }

                                                        if (request.status === 200) {
                                                            const responseJSON = JSON
                                                                .parse(request.responseText);

                                                            if (responseJSON.result && responseJSON.result.geometry && responseJSON.result.geometry.location) {
                                                                this.setState({
                                                                    loading: false,
                                                                    options: null,
                                                                    modalVisible: false,
                                                                });

                                                                this.props.onSelectPlace({
                                                                    id: item.place_id,
                                                                    label: item.description,
                                                                    location: responseJSON.result.geometry.location,
                                                                });
                                                            }
                                                        }
                                                    };

                                                    request.open('GET', `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyCH_Vv1cMkTEL3ADcBCDKBe9F9GZeTc-Hk&placeid=${item.place_id}`);

                                                    request.send();
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 20,
                                                        borderColor: '#ccc',
                                                        borderWidth: 0,
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        alignSelf: 'flex-start',
                                                        backgroundColor: Theme.Colors.Primary,
                                                    }}
                                                >
                                                    <Icon
                                                        style={{
                                                            fontSize: 30,
                                                            color: '#fff',
                                                        }}
                                                        type="Entypo"
                                                        name="location-pin"
                                                    />
                                                </View>

                                                <Text
                                                    style={{
                                                        color: '#000',
                                                        textAlign: 'left',
                                                        marginLeft: 10,
                                                        flex: 1,
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    {item.description}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                ))
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }

    render() {
        return (
            <View
                style={{
                    ...Theme.Forms.FormControl,
                }}
            >
                {this.renderControl()}

                {
                    this.renderSearchPicker()
                }
            </View>
        );
    }
}

PlacePicker.defaultProps = {
    placeholder: '',
};
