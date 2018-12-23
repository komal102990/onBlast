import React, { Component } from 'react';
import {
    Container,
    View,
} from 'native-base';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { Theme } from 'src/styles';
import SearchPlaces from 'src/components/search/tabs/SearchPlaces';
import SearchReviewers from 'src/components/search/tabs/SearchReviewers';
import firebase from 'react-native-firebase';

/**
 *  @function searchPlaces
 *
 *  @param {string} keyword - The search keyboard.
 */
function searchPlaces(keyword) {
    const request = new XMLHttpRequest();

    this.setState({
        loadingPlaces: true,
    });

    request.onreadystatechange = () => {
        if (request.readyState !== 4) {
            return;
        }

        if (request.status === 200) {
            const responseJSON = JSON.parse(request.responseText);

            if (typeof responseJSON.predictions !== 'undefined') {
                this.setState({
                    places: [].concat(responseJSON.predictions),
                });
            }
        }

        setTimeout(() => {
            this.setState({
                loadingPlaces: false,
            });
        }, 700);
    };

    request.open('GET', `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCH_Vv1cMkTEL3ADcBCDKBe9F9GZeTc-Hk&types=establishment&input=${encodeURIComponent(keyword)}`);

    request.send();
}

/**
 *  @function searchPlaces
 *
 *  @param {string} keyword - The search keyboard.
 */
function searchReviewers(keyword) {
    this.setState({
        loadingReviewers: true,
    });

    firebase.database()
        .ref('users')
        .orderByChild('email')
        .startAt(keyword)
        .endAt(`${keyword}\uf8ff`)
        .once('value', (snapshot) => {
            setTimeout(() => {
                if (snapshot.val() !== null) {
                    this.setState({
                        loadingReviewers: false,
                        reviewers: Object.keys(snapshot.val()).map((item) => {
                            const obj = snapshot.val();

                            return {
                                ...obj[item],
                                id: item,
                            };
                        }),
                    });
                } else {
                    this.setState({
                        loadingReviewers: false,
                        reviewers: [],
                    });
                }
            }, 700);
        });
}

class SearchScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingPlaces: false,
            loadingReviewers: false,
            places: [],
            reviewers: [],
        };
    }

    componentDidMount() {
        this.props.navigator.setStyle({
            navBarBackgroundColor: Theme.Colors.Primary,
            topBarElevationShadowEnabled: false,
            navBarComponentAlignment: 'fill',
            navBarHidden: false,
            navBarTextColor: '#fff',
            navBarButtonColor: '#fff',
            tabBarHidden: true,
            navBarCustomView: 'SearchBar',
            navBarNoBorder: true,
            navBarCustomViewInitialProps: {
                onBack: () => {
                    this.props.navigator.pop();
                },
                onSearch: (keyword) => {
                    searchPlaces.call(this, keyword || 'A');
                    searchReviewers.call(this, keyword || '');
                },
            },
        });

        searchPlaces.call(this, 'A');
        searchReviewers.call(this, '');
    }

    render() {
        return (
            <Container
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                }}
            >
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'blue',
                        }}
                    >
                        <ScrollableTabView
                            contentProps={{
                                style: {
                                    flex: 1,
                                },
                                keyboardShouldPersistTaps: 'always',
                                keyboardDismissMode: 'none',
                                scrollEnabled: true,
                            }}
                            style={{
                                height: 200,
                                flex: 1,
                            }}
                            renderTabBar={() => (
                                <DefaultTabBar
                                    style={{ height: 50 }}
                                    tabStyle={{ padding: 15 }}
                                    textStyle={{
                                        fontSize: 16,
                                        fontFamily: Theme.Fonts.HelveticaNeueLight,
                                        fontWeight: 'normal',
                                    }}
                                    activeTextColor="#fff"
                                    inactiveTextColor="#ffffff90"
                                    underlineStyle={{ backgroundColor: '#fff', height: 2 }}
                                    backgroundColor={Theme.Colors.Primary}
                                />
                            )}
                            prerenderingSiblingsNumber={1}
                        >
                            <SearchPlaces
                                nav={this.props.navigator}
                                tabLabel="Places"
                                loading={this.state.loadingPlaces}
                                places={this.state.places}
                            />
                            <SearchReviewers
                                nav={this.props.navigator}
                                tabLabel="Reviewers"
                                loading={this.state.loadingReviewers}
                                reviewers={this.state.reviewers}
                            />
                        </ScrollableTabView>
                    </View>
                </View>
            </Container>
        );
    }
}

export default connect(null, null)(SearchScreen);
