import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { View, Text, Icon } from 'native-base';
import { Theme } from 'src/styles';
import ReviewerHeader from 'src/components/reviewer/ReviewerHeader';
import Modal from 'react-native-modal';
import {
    AnTouchable,
} from 'src/components/common';
import { ReviewerActions, ReviewerReviewsActions, UserContextActions } from 'src/redux/actions';
import firebase from 'react-native-firebase';
import ReviewsList from 'src/components/review/ReviewsList';
import Immutable from 'immutable';
import BottomTabs from 'src/components/bottom-tabs/BottomTabs';

class ReviewerScreen extends Component {
    static navigatorStyle = {
        ...Theme.Nav.Primary,
        tabBarHidden: true,
        tabBarTranslucent: true,
        drawUnderTabBar: true,
    }

    constructor(props) {
        super(props);

        this.state = {
            tabs: false,
            showLogoutConfirmationModal: false,
            follow: false,
        };
    }

    componentWillMount() {
        if (!this.props.reviewerId) {
            this.setState({
                tabs: true,
            });
        }
    }

    componentDidMount() {
        this.props.navigator.setTitle({
            title: (!this.props.reviewerId || this.props.context.id === this.props.reviewerId) ?
                'Me' : `${this.props.reviewer.data.name} ${this.props.reviewer.data.surname}`,
        });

        if (!this.props.reviewerId || this.props.context.id === this.props.reviewerId) {
            this.props.navigator.setButtons({
                rightButtons: [
                    {
                        id: 'sign-out-button',
                        component: 'SignOutButton', // This line loads our component as a nav bar button item
                        passProps: {
                            onPress: () => {
                                this.setState({
                                    showLogoutConfirmationModal: true,
                                });
                            },
                        },
                    },
                    {
                        id: 'ios-notifications-outline',
                        component: 'NotificationButton', // This line loads our component as a nav bar button item
                        passProps: {
                            onPress: () => {
                                this.props.navigator.push({
                                    screen: 'NotificationScreen',
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
        }

        this.props.fetchReviews(this.props.reviewerId || this.props.context.id);
        this.props.fetchProfile(this.props.reviewerId || this.props.context.id);

        if (this.props.context) {
            firebase.database().ref(`followers/by_user/${this.props.context.id}/my_reviewers/${this.props.reviewerId}`)
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
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reviewer && nextProps.reviewer.data) {
            this.props.navigator.setTitle({
                title: (!this.props.reviewerId || this.props.context.id === this.props.reviewerId) ?
                    'Me' : `${nextProps.reviewer.data.name} ${nextProps.reviewer.data.surname}`,
            });
        }
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
                                more={false}
                                refreshing={false}
                                onRefresh={() => {

                                }}
                                onEndReached={() => {

                                }}
                                header={
                                    (this.props.reviewer && this.props.reviewer.data) ? (
                                        <ReviewerHeader
                                            me={!this.props.reviewerId || this.props.context.id === this.props.reviewerId}
                                            context={this.props.context}
                                            follow={this.state.follow}
                                            reviewerId={this.props.reviewerId}
                                            reviewer={this.props.reviewer.data}
                                            onEditClicked={() => {
                                                this.props.navigator.push({
                                                    screen: 'ProfileScreen',
                                                    backButtonTitle: '',
                                                    animationType: 'fade',
                                                });
                                            }}
                                            onFollowClicked={() => {
                                                this.props.followProfile(this.props.reviewerId);
                                                this.setState({
                                                    follow: true,
                                                });
                                            }}
                                            onUnfollowClicked={() => {
                                                this.props.unfollowProfile(this.props.reviewerId);
                                                this.setState({
                                                    follow: false,
                                                });
                                            }}
                                        />
                                    ) : null
                                }
                            />
                        ))}

                    </ScrollView>
                </View>


                <Modal
                    isVisible={this.state.showLogoutConfirmationModal}
                >
                    <View
                        style={{
                            backgroundColor: '#fff',
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: 'transparent',
                                padding: 15,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: '#fff',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                }}
                            >
                                <Icon
                                    type="MaterialIcons"
                                    name="exit-to-app"
                                    style={{
                                        width: 30,
                                        height: 26,
                                        fontSize: 28,
                                        color: '#F04237',
                                        marginRight: 10,
                                    }}
                                />

                                <Text
                                    style={{
                                        fontFamily: Theme.Fonts.HelveticaNeueLight,
                                        fontSize: 22,
                                    }}
                                >
                                    Exit
                                </Text>
                            </View>
                            <View
                                style={{
                                    maxWidth: 230,
                                }}
                            >
                                <Text
                                    style={{
                                        fontFamily: Theme.Fonts.HelveticaNeueLight,
                                        fontSize: 18,
                                    }}
                                >
                                    Are you sure you want to exit ?
                                </Text>
                            </View>

                            <View
                                style={{
                                    marginTop: 40,
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <AnTouchable
                                    style={{
                                        marginRight: 20,
                                    }}
                                    onPress={() => {
                                        this.setState({
                                            showLogoutConfirmationModal: false,
                                        });
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: Theme.Fonts.HelveticaNeueLight,
                                        }}
                                    >
                                        Cancel
                                    </Text>
                                </AnTouchable>

                                <AnTouchable
                                    onPress={() => {
                                        this.setState({
                                            showLogoutConfirmationModal: false,
                                        }, () => {
                                            firebase.auth().signOut();
                                            this.props.eraseUserContext();
                                        });
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: Theme.Fonts.HelveticaNeueLight,
                                            color: Theme.Colors.Primary,
                                        }}
                                    >
                                        Exit
                                    </Text>
                                </AnTouchable>
                            </View>
                        </View>
                    </View>
                </Modal>

                {
                    (this.state.tabs && (
                        <BottomTabs
                            active={3}
                            nav={this.props.navigator}
                        />
                    ))
                }
            </View>
        );
    }
}

const mapStateToProps = (state, props) => ({
    context: state.userContext.get('user'),
    reviewer: state.reviewer.get(props.reviewerId || state.userContext.get('user').id),
    reviews: (state.reviewerReviews.get(props.reviewerId || state.userContext.get('user').id) !== undefined) ?
        state.reviewerReviews.get(props.reviewerId || state.userContext.get('user').id).reviews : Immutable.List(),
});

const mapDispatchToProps = dispatch => ({
    fetchProfile: reviewerId => dispatch(ReviewerActions.fetchProfile(reviewerId)),
    fetchReviews: reviewerId => dispatch(ReviewerReviewsActions.fetchReviews(reviewerId)),
    followProfile: reviewerId => dispatch(ReviewerActions.followProfile(reviewerId)),
    unfollowProfile: reviewerId => dispatch(ReviewerActions.unfollowProfile(reviewerId)),
    eraseUserContext: () => dispatch(UserContextActions.eraseUserContext()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewerScreen);
