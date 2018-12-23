import React, { Component } from 'react';
import {
    View,
} from 'native-base';
import { connect } from 'react-redux';
import ReviewsList from 'src/components/review/ReviewsList';
import BottomTabs from 'src/components/bottom-tabs/BottomTabs';
import { PlacesFeedActions } from 'src/redux/actions';

class MyPlacesFeedScreen extends Component {
    constructor(props) {
        super(props);

        this.onRefresh = this.props.refreshReviews.bind(this);
        this.onEndReached = this.props.fetchReviews.bind(this);
    }

    componentDidMount() {
        this.props.navigator.setTitle({
            title: 'My Spots',
        });

        this.props.navigator.setButtons({
            rightButtons: [
                {
                    id: 'search-button',
                    component: 'SearchButton', // This line loads our component as a nav bar button item
                    passProps: {
                        onPress: () => {
                            this.props.navigator.push({
                                screen: 'SearchMySpotScreen',
                                animationType: 'none',
                                backButtonHidden: true,
                            });
                        },
                    },
                },
            ],
            leftButtons: [
                {
                    id: 'menu-button',
                    component: 'MenuButton', // This line loads our component as a nav bar button item
                    // passProps: {
                    //     onPress: () => {
                    //         this.props.navigator.push({
                    //             screen: 'SearchScreen',
                    //             animationType: 'none',
                    //             backButtonHidden: true,
                    //         });
                    //     },
                    // },
                },
            ]
        });

        this.props.fetchReviews();
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                }}
            >
                <ReviewsList
                    navigator={this.props.navigator}
                    reviews={this.props.reviews}
                    more={this.props.more}
                    refreshing={this.props.refreshing}
                    onRefresh={this.onRefresh}
                    onEndReached={this.onEndReached}
                />

                <BottomTabs
                    active={1}
                    nav={this.props.navigator}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    reviews: state.placesFeed.get('reviews'),
    more: state.placesFeed.get('more'),
    refreshing: state.placesFeed.get('refreshing'),
});

const mapDispatchToProps = dispatch => ({
    fetchReviews: () => dispatch(PlacesFeedActions.fetchReviews()),
    refreshReviews: () => dispatch(PlacesFeedActions.refreshReviews()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPlacesFeedScreen);
