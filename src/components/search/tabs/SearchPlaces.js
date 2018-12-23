import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { Content, Text, View } from 'native-base';
import SearchPlaceResult from 'src/components/search/SearchPlaceResult';
import UserListPlaceholder from 'src/components/placeholder/UserListPlaceholder';
import { Theme } from 'src/styles';
import firebase from 'react-native-firebase';


class SearchPlaces extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checking: false,
        };

        this.onResultKeyExtractor = this.onResultKeyExtractor.bind(this);
        this.onRowRenderer = this.onRowRenderer.bind(this);
    }

    onResultKeyExtractor(item) {
        return item.id.toString();
    }

    onResultClicked(data) {
        this.setState({
            checking: true,
        });

        const request = new XMLHttpRequest();

        request.onreadystatechange = () => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                const responseJSON = JSON.parse(request.responseText);

                if (responseJSON.result && responseJSON.result.geometry && responseJSON.result.geometry.location) {
                    firebase.database().ref(`places/${data.item.place_id}`)
                        .transaction((snapshot) => {
                            if (snapshot === null) {
                                return {
                                    created_at: firebase.database.ServerValue.TIMESTAMP,
                                    blasts: 0,
                                    fans: 0,
                                    views: 0,
                                    name: data.item.description,
                                    lat: responseJSON.result.geometry.location.lat,
                                    lng: responseJSON.result.geometry.location.lng,
                                };
                            }

                            return snapshot;
                        })

                        .then(() => {
                            this.setState({
                                checking: false,
                            }, () => {
                                this.props.nav.push({
                                    screen: 'PlaceScreen',
                                    backButtonTitle: '',
                                    animationType: 'slide-horizontal',
                                    passProps: {
                                        placeId: data.item.place_id,
                                    },
                                });
                            });
                        });
                }
            }
        };

        request.open('GET', `https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyCH_Vv1cMkTEL3ADcBCDKBe9F9GZeTc-Hk&placeid=${data.item.place_id}`);

        request.send();
    }

    onRowRenderer(data) {
        return (
            <SearchPlaceResult
                id={data.item.id}
                name={data.item.description}
                onResultClicked={this.onResultClicked.bind(this, data)}
            />
        );
    }

    render() {
        return (
            <Content
                keyboardShouldPersistTaps="handled"
                style={{
                    backgroundColor: '#fff',
                }}
            >
                {
                    (this.state.checking && (
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
                                Find reviews for this place. Please wait ...
                            </Text>
                        </View>
                    ))
                }
                {
                    (!this.state.checking && this.props.loading && (
                        <View
                            style={{
                                padding: 10,
                            }}
                        >
                            <UserListPlaceholder />
                        </View>
                    ))
                }

                {
                    (!this.state.checking && !this.props.loading && this.props.places.length === 0 && (
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
                                No places found for your criteria!
                            </Text>
                        </View>
                    ))
                }

                {
                    (!this.state.checking && !this.props.loading && this.props.places.length > 0 && (
                        <FlatList
                            keyExtractor={this.onResultKeyExtractor}
                            data={this.props.places}
                            renderItem={this.onRowRenderer}
                            renderAheadOffset={2000}
                        />
                    ))
                }
            </Content>
        );
    }
}

export default connect(null, null)(SearchPlaces);
