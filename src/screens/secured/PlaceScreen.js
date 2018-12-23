import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { View } from 'native-base';
import { Theme } from 'src/styles';
import ReviewSingleItem from 'src/components/review/ReviewSingleItem';
import PlaceHeader from 'src/components/place/PlaceHeader';
import { PlaceActions, PlaceReviewsActions } from 'src/redux/actions';
import firebase from 'react-native-firebase';
import ReviewsList from 'src/components/review/ReviewsList';
import Immutable from 'immutable';

class PlaceScreen extends Component {
    static navigatorStyle = {
        ...Theme.Nav.Primary,
        tabBarHidden: true,
        tabBarTranslucent: true,
        drawUnderTabBar: true,
    }

    constructor(props) {
        super(props);

        this.state = {
            follow: false,
        };

        this.onEndReached = this.props.fetchReviews.bind(this);
        this.onRefresh = () => null;
    }

    componentDidMount() {
        this.props.fetchPlace(this.props.placeId);
        this.props.fetchReviews(this.props.placeId);

        if (this.props.context.get('user')) {
            firebase.database().ref(`followers/by_user/${this.props.context.get('user').id}/my_places/${this.props.placeId}`)
                .on('value', (snapshot) => {
                    if (snapshot.val() !== null) {
                        this.setState({
                            follow: true,
                        });
                    } else {
                        this.setState({
                            follow: false,
                        });
                    }
                });
        }

        if (this.props.place && this.props.place.data) {
            this.props.navigator.setTitle({
                title: this.props.place.data.name,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.place && nextProps.place.data) {
            this.props.navigator.setTitle({
                title: nextProps.place.data.name,
            });
        }
    }

    _rowRenderer(data) {
        return (
            <ReviewSingleItem
                ref={() => {

                }}
                params={data.item}
                messagesButton
                onMessagesClicked={() => {
                    this.props.navigator.push({
                        screen: 'VideoScreen',
                        backButtonTitle: '',
                        animationType: 'slide-horizontal',
                    });
                }}
                onProfilePress={() => {
                    this.props.navigator.push({
                        screen: 'ProfileScreen',
                        backButtonTitle: '',
                        animationType: 'slide-horizontal',
                    });
                }}
                onPlacePress={() => {
                    this.props.navigator.push({
                        screen: 'PlaceScreen',
                        backButtonTitle: '',
                        animationType: 'slide-horizontal',
                    });
                }}
            />
        );
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <View
                    style={{
                        flex: 1,
                    }}
                >
                    <ScrollView
                        scrollEnabled={false}
                        contentContainerStyle={{
                            flex: 1,
                        }}
                    >
                        {(this.props.reviews && (
                            <ReviewsList
                                navigator={this.props.navigator}
                                reviews={this.props.reviews}
                                more={this.props.more}
                                refreshing={this.props.refreshing}
                                onRefresh={this.onRefresh}
                                onEndReached={this.onEndReached}
                                header={
                                    (this.props.place && this.props.place.data) ? (
                                        <PlaceHeader
                                            place={this.props.place.data}
                                            follow={this.state.follow}
                                            onFollowClicked={() => {
                                                this.props.followPlace(this.props.placeId);
                                            }}
                                            onUnfollowClicked={() => {
                                                this.props.unfollowPlace(this.props.placeId);
                                            }}
                                        />
                                    ) : null
                                }
                            />
                        ))}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state, props) => ({
    context: state.userContext,
    place: state.place.get(props.placeId),
    reviews: (state.placeReviews.get(props.placeId) !== undefined) ? state.placeReviews.get(props.placeId).reviews : Immutable.List(),
    more: state.homeFeed.get('more'),
    refreshing: state.homeFeed.get('refreshing'),
});

const mapDispatchToProps = dispatch => ({
    fetchPlace: placeId => dispatch(PlaceActions.fetchPlace(placeId)),
    fetchReviews: placeId => dispatch(PlaceReviewsActions.fetchReviews(placeId)),
    followPlace: placeId => dispatch(PlaceActions.followPlace(placeId)),
    unfollowPlace: placeId => dispatch(PlaceActions.unfollowPlace(placeId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceScreen);
