import React, { Component } from 'react';
import { FlatList, BackHandler, Platform, Dimensions, Keyboard } from 'react-native';
import { View, Text, Icon } from 'native-base';
import { AnInput, AnTouchable } from 'src/components/common';
import { Theme } from 'src/styles';
import ListPlaceholder from 'src/components/placeholder/ListPlaceholder';
import firebase from 'react-native-firebase';
import { isIphoneX } from 'react-native-iphone-x-helper';

const { height } = Dimensions.get('window');

class SelectBlastPlaceModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height,
            checking: false,
            predictions: [],
        };

        this.onChangeText = this.onChangeText.bind(this);
        // this.onRequestClose = this.props.onRequestClose.bind(this);
    }

    componentWillMount() {
        if (Platform.OS === 'android') {
            this.backHandlerListener = BackHandler.addEventListener('hardwareBackPress', () => {
                this.props.onRequestClose();

                return true;
            });
        }
    }

    componentDidMount() {
        this.props.navigator.setTitle({
            title: 'Who are you blasting ?',
        });

        this.props.navigator.setButtons({
            rightButtons: [
                {
                    id: 'close-button',
                    component: 'CloseButton', // This line loads our component as a nav bar button item
                    passProps: {
                        onPress: () => {
                            this.props.onRequestClose();
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

    onChangeText(who) {
        this.setState({
            loading: true,
        });

        const request = new XMLHttpRequest();

        request.onreadystatechange = () => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                const responseJSON = JSON.parse(request.responseText);

                if (typeof responseJSON.predictions !== 'undefined') {
                    this.setState({
                        predictions: [].concat(responseJSON.predictions),
                    });
                }
            }

            this.setState({
                loading: false,
            });
        };

        request.open('GET', `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCH_Vv1cMkTEL3ADcBCDKBe9F9GZeTc-Hk&types=establishment&input=${encodeURIComponent(who)}`);

        request.send();
    }

    onRenderRow(item) {
        return (
            <AnTouchable
                activeOpacity={0.6}
                style={{
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    minHeight: 50,
                    paddingLeft: 5,
                    paddingRight: 10,
                    paddingTop: 10,
                    paddingBottom: 10,
                    marginBottom: 5,
                    alignItems: 'center',
                }}

                onPress={() => {
                    this.setState({
                        checking: true,
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
                                firebase.database().ref(`places/${item.item.place_id}`)
                                    .transaction((snapshot) => {
                                        if (snapshot === null) {
                                            return {
                                                created_at: firebase.database.ServerValue.TIMESTAMP,
                                                blasts: 0,
                                                fans: 0,
                                                views: 0,
                                                name: item.item.description,
                                                lat: responseJSON.result.geometry.location.lat,
                                                lng: responseJSON.result.geometry.location.lng,
                                            };
                                        }

                                        return snapshot;
                                    })

                                    .then(() => {
                                        this.props.onSelectPlace({
                                            id: item.item.place_id,
                                            label: item.item.description,
                                            location: responseJSON.result.geometry.location,
                                        });
                                    });
                            }
                        }
                    };

                    request.open('GET', `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyCH_Vv1cMkTEL3ADcBCDKBe9F9GZeTc-Hk&placeid=${item.item.place_id}`);

                    setTimeout(() => {
                        request.send();
                    }, 2000);
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
                        fontFamily: Theme.Fonts.HelveticaNeueLight,
                        fontSize: 14,
                        flex: 1,
                        color: '#000',
                        marginLeft: 10,
                    }}
                >
                    {item.item.description}
                </Text>
            </AnTouchable>
        );
    }

    render() {
        if (this.state.checking) {
            return (
                <View
                    style={{
                        height: (Platform.OS === 'android') ?
                            this.state.height - 100 : (isIphoneX()) ?
                                this.state.height - 108 : this.state.height - 84,
                        backgroundColor: '#fff',

                    }}
                >
                    <View
                        style={{
                            padding: 5,
                            paddingTop: 50,
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: Theme.Fonts.HelveticaNeueLight,
                            }}
                        >
                            Verifing place. Please wait ...
                        </Text>
                    </View>
                </View>
            );
        }

        return (
            <View
                style={{
                    height: (Platform.OS === 'android') ?
                        this.state.height - 100 : (isIphoneX()) ?
                            this.state.height - 108 : this.state.height - 84,
                    backgroundColor: '#fff',

                }}
            >
                <View
                    style={{
                        padding: 5,
                    }}
                >
                    <View>
                        <AnInput
                            refcb={(ref) => {
                                this.inputRef = ref;
                            }}
                            placeholder="Find a place"
                            placeholderTextColor={Theme.Colors.Primary}
                            autoCorrect={false}
                            formControlStyles={{
                                marginTop: 0,
                                marginBottom: 0,
                            }}
                            customStyles={{
                                fontFamily: Theme.Fonts.HelveticaNeueLight,
                                backgroundColor: '#fff',
                                height: 45,
                                padding: 5,
                                color: '#000',
                                textAlign: 'left',
                                borderBottomWidth: 1,
                                fontSize: 17,
                            }}

                            onChangeText={this.onChangeText}

                            autoCapitalize="none"
                        />
                    </View>

                    {
                        (this.state.loading && (
                            <ListPlaceholder />
                        ))
                    }

                    {
                        (!this.state.loading && !this.state.checking && (
                            <View
                                style={{
                                    marginTop: 10,
                                }}
                            >
                                <FlatList
                                    keyboardShouldPersistTaps="handled"
                                    style={{
                                    }}
                                    keyExtractor={item => (
                                        item.id.toString()
                                    )}
                                    data={this.state.predictions}
                                    renderItem={this.onRenderRow.bind(this)}
                                />
                            </View>
                        ))
                    }
                </View>
            </View>
        );
    }
}

export default SelectBlastPlaceModal;
