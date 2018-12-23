import React, { Component } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
    View,
    Text,
} from 'native-base';
import { connect } from 'react-redux';
import { Theme } from 'src/styles';
import ReviewsList from 'src/components/review/ReviewsList';
import ReviewLiveListItem from 'src/components/review/ReviewLiveListItem';
import BottomTabs from 'src/components/bottom-tabs/BottomTabs';
import { HomeFeedActions } from 'src/redux/actions';
import firebase from 'react-native-firebase';

const styles = StyleSheet.create({
    aa: {
        flex: 1,
    },
    ab: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 10,
        borderBottomColor: Theme.Colors.Primary,
        borderBottomWidth: 1,
    },
    ac: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    },
    ad: {
        fontFamily: Theme.Fonts.RobotoRegular,
        fontSize: 11,
        color: Theme.Colors.Primary,
        marginRight: 5,
    },
    ae: {
        fontFamily: Theme.Fonts.RobotoBold,
        fontSize: 11,
        color: Theme.Colors.Primary,
        marginRight: 5,
    },
    af: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Theme.Colors.Primary,
    },
    ag: {
        width: 10,
    },
});

class HomeFeedScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lives: [],
        };

        this.onLiveItemKeyExtractor = this.onLiveItemKeyExtractor.bind(this);
        this.onRenderLiveItem = this.onRenderLiveItem.bind(this);
        this.onRenderLiveItemSeparatorComponent = this.onRenderLiveItemSeparatorComponent.bind(this);
        this.onRefresh = this.props.refreshReviews.bind(this);
        this.onEndReached = this.props.fetchReviews.bind(this);
    }

    componentDidMount() {
        this.props.navigator.setTitle({
            title: 'Feed',
        });

        this.props.navigator.setButtons({
            rightButtons: [
                {
                    id: 'search-button',
                    component: 'SearchButton', // This line loads our component as a nav bar button item
                    passProps: {
                        onPress: () => {
                            this.props.navigator.push({
                                screen: 'SearchScreen',
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

        this.livesListener = firebase.database().ref('lives')
            .on('value', (snapshot) => {
                if (snapshot && snapshot.val() !== null) {
                    const data = [];

                    snapshot.forEach((ss) => {
                        data.push(ss.val());
                    });

                    this.setState({
                        lives: data,
                    });
                } else {
                    this.setState({
                        lives: [],
                    });
                }
            });
    }

    componentWillUnmount() {
        firebase.database().ref('lives').off('value', this.livesListener);
    }

    onLiveItemKeyExtractor(item) {
        return String(item.id);
    }

    onRenderLiveItem(item) {
        return (
            <View>
                <ReviewLiveListItem
                    goToLive={() =>
                        this.props.navigator
                            .push({
                                screen: 'LiveScreen',
                                backButtonTitle: '',
                                animationType: 'none',
                                passProps: {
                                    id: item.item.id,
                                },
                            })
                    }
                />
            </View>
        );
    }

    onRenderLiveItemSeparatorComponent() {
        return (
            <View
                style={styles.ag}
            />
        );
    }

    render() {
        return (
            <View
                style={styles.aa}
            >
                <View
                    style={styles.aa}
                >
                    <View
                        style={styles.ab}
                    >
                        <View
                            style={styles.ac}
                        >
                            <Text
                                style={styles.ad}
                            >
                                onBlast
                            </Text>

                            <Text
                                style={styles.ae}
                            >
                                LIVE
                            </Text>

                            <View
                                style={styles.af}
                            />
                        </View>

                        <View>
                            <FlatList
                                keyExtractor={this.onLiveItemKeyExtractor}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={this.state.lives}
                                renderItem={this.onRenderLiveItem}
                                ItemSeparatorComponent={this.onRenderLiveItemSeparatorComponent}
                            />
                        </View>
                    </View>

                    <ReviewsList
                        navigator={this.props.navigator}
                        reviews={this.props.reviews}
                        more={this.props.more}
                        refreshing={this.props.refreshing}
                        onRefresh={this.onRefresh}
                        onEndReached={this.onEndReached}
                    />
                </View>

                <BottomTabs
                    active={0}
                    nav={this.props.navigator}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    reviews: state.homeFeed.get('reviews'),
    more: state.homeFeed.get('more'),
    refreshing: state.homeFeed.get('refreshing'),
});

const mapDispatchToProps = dispatch => ({
    fetchReviews: () => dispatch(HomeFeedActions.fetchReviews()),
    refreshReviews: () => dispatch(HomeFeedActions.refreshReviews()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeFeedScreen);
