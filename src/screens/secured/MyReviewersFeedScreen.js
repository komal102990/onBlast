import React, { Component } from 'react';
import {
    View,
} from 'native-base';
import { connect } from 'react-redux';
import ReviewsList from 'src/components/review/ReviewsList';
import BottomTabs from 'src/components/bottom-tabs/BottomTabs';
import { ReviewersFeedActions } from 'src/redux/actions';

class MyReviewersFeedScreen extends Component {
    constructor(props) {
        super(props);

        this.onRefresh = this.props.refreshReviews.bind(this);
        this.onEndReached = this.props.fetchReviews.bind(this);
    }

    componentDidMount() {
        this.props.navigator.setTitle({
            title: 'Viewing',
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
                    active={4}
                    nav={this.props.navigator}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    reviews: state.reviewersFeed.get('reviews'),
    refreshing: state.reviewersFeed.get('refreshing'),
    page: state.reviewersFeed.get('page'),
});

const mapDispatchToProps = dispatch => ({
    fetchReviews: () => dispatch(ReviewersFeedActions.fetchReviews()),
    refreshReviews: () => dispatch(ReviewersFeedActions.refreshReviews()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyReviewersFeedScreen);
