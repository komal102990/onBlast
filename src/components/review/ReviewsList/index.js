import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions, RefreshControl, StyleSheet, ListView, ScrollView } from 'react-native';
import { View, Text } from 'native-base';
import { Theme } from 'src/styles';
import ReviewSingleItem from 'src/components/review/ReviewSingleItem';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { isIphoneX } from 'react-native-iphone-x-helper';

const Spinner = require('react-native-spinkit');

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    aa: {
        flex: 1,
    },
    ab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ac: {
        height: 80,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ad: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    ae: {
        textAlign: 'center',
        color: '#ccc',
        fontSize: 18,
        fontFamily: Theme.Fonts.RobotoRegular,
    },
});

class ReviewsList extends Component {
    constructor(props) {
        super(props);

        this.dataProvider = new DataProvider((r1, r2) => true);

        const reviews = props.reviews.toJS();
        if (this.props.header) {
            reviews.unshift('header');
        }

        this.state = {
            didAppear: false,
            dataProvider: this.dataProvider.cloneWithRows(reviews),
        };

        this.layoutProvider = new LayoutProvider(
            (index) => {
                if (this.props.header && index === 0) {
                    return 1;
                }

                return 0;
            },
            (type, dim) => {
                switch (type) {
                case 1:
                    dim.width = width; // eslint-disable-line
                    dim.height = 300;
                    break;

                default:
                    dim.width = width; // eslint-disable-line
                    dim.height = height / 2 + 5; // eslint-disable-line
                }
            },
        );

        this.videos = {};
        this.current = null; // The current active video
        this.next = null; // The next video to play
        this.lettimeout = null;
        this.timeout = null;

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        this.onMessagesClicked = this.onMessagesClicked.bind(this);
        this.onProfilePress = this.onProfilePress.bind(this);
        this.onPlacePress = this.onPlacePress.bind(this);
        this.onRowRenderer = this.onRowRenderer.bind(this);
        this.onVisibleIndexesChanged = this.onVisibleIndexesChanged.bind(this);
        this.onRenderFooter = this.onRenderFooter.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.onRefresh = this.props.onRefresh.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const reviews = nextProps.reviews.toJS();
        if (this.props.header) {
            reviews.unshift('header');
        }
        this.setState({
            dataProvider: this.dataProvider.cloneWithRows(reviews),
        });
    }

    onNavigatorEvent(event) {
        switch (event.id) {
        case 'didAppear':
            if (this.lettimeout) {
                clearTimeout(this.lettimeout);
            }

            if (this.videos[this.current]) {
                this.videos[this.current].play();
            }

            setTimeout(() => {
                this.setState({
                    didAppear: true,
                });
            }, 1000);

            break;
        case 'didDisappear':
            clearTimeout(this.timeout);

            if (this.videos[this.current]) {
                this.videos[this.current].stop();
            }

            this.lettimeout = setTimeout(() => {
                if (this.videos[this.current]) {
                    this.videos[this.current].stop();
                }
            }, 1200);

            break;
        default:
            break;
        }
    }

    onMessagesClicked(reviewId) {
        this.props.navigator.push({
            screen: 'VideoScreen',
            backButtonTitle: '',
            animationType: 'slide-horizontal',
            passProps: {
                reviewId,
            },
        });
    }

    onProfilePress(reviewerId) {
        this.props.navigator.push({
            screen: 'ReviewerScreen',
            backButtonTitle: '',
            animationType: 'slide-horizontal',
            passProps: {
                reviewerId,
            },
        });
    }

    onPlacePress(placeId) {
        this.props.navigator.push({
            screen: 'PlaceScreen',
            backButtonTitle: '',
            animationType: 'slide-horizontal',
            passProps: {
                placeId,
            },
        });
    }

    onRowRenderer(type, data) {
        if (this.props.header && data === 'header') {
            return this.props.header;
        }

        return (
            <ReviewSingleItem
                ref={(ref) => {
                    if (ref) {
                        this.videos[data] = ref.getWrappedInstance();
                    }
                }}
                reviewId={data}
                messagesButton
                onMessagesClicked={this.onMessagesClicked}
                onProfilePress={this.onProfilePress}
                onPlacePress={this.onPlacePress}
            />
        );
    }

    onEndReached() {
        if (!this.props.refreshing) {
            this.props.onEndReached();
        }
    }

    onVisibleIndexesChanged(all) {
        let item = null;
        if (!this.props.header) {
            if (all.length === 1) {
                item = this.state.dataProvider.getDataForIndex(all[0]);
            } else if (all.length === 3) {
                item = this.state.dataProvider.getDataForIndex(all[1]);
            } else if (all.length === 2 && all[0] === 0) {
                item = this.state.dataProvider.getDataForIndex(all[0]);
            } else {
                item = this.state.dataProvider.getDataForIndex(all[1]);
            }
        } else if (all.length > 1) {
            item = this.state.dataProvider.getDataForIndex(all[1]);
        }

        console.log('indexes', item);

        if (item) {
            if (item === this.next) {
                return;
            }

            if (this.videos && this.videos[this.current]) {
                this.videos[this.current].stop();
            }

            this.next = item;

            this.timeout = setTimeout(() => {
                if (item === this.next) {
                    if (this.videos && this.videos[this.next]) {
                        this.videos[this.next].play();
                        this.current = this.next;
                    }
                }
            }, 1000);
        }
    }

    onRenderFooter() {
        if (this.props.more && !this.props.refreshing) {
            return (
                <View
                    style={styles.ac}
                >
                    <Spinner
                        isVisible
                        size={30}
                        type="ThreeBounce"
                        color={Theme.Colors.Primary}
                    />
                </View>
            );
        }

        return null;
    }

    render() {
        return (
            <View
                style={styles.aa}
            >
                {
                    (!this.state.didAppear) ? (
                        <View
                            style={styles.ab}
                        >
                            <Spinner
                                isVisible
                                size={30}
                                type="ThreeBounce"
                                color={Theme.Colors.Primary}
                            />
                        </View>
                    ) : (this.props.reviews.size > 0) ? (
                        <RecyclerListView
                            contentContainerStyle={[{ paddingBottom: (isIphoneX()) ? 15 : 0 }, { ...this.props.contentContainerStyle }]}
                            style={{ ...this.props.style }}
                            layoutProvider={this.layoutProvider}
                            dataProvider={this.state.dataProvider}
                            rowRenderer={this.onRowRenderer}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.props.refreshing}
                                    onRefresh={this.onRefresh}
                                />
                            }
                            onEndReached={this.onEndReached}

                            disableRecycling

                            renderAheadOffset={2000}

                            onEndReachedThreshold={100}

                            onVisibleIndexesChanged={this.onVisibleIndexesChanged}

                            renderFooter={this.onRenderFooter}
                        />
                    ) : (
                        <ScrollView
                            contentContainerStyle={styles.ad}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.props.refreshing}
                                    onRefresh={this.onRefresh}
                                />
                            }
                        >
                            <View
                                style={{
                                    flex: 1,
                                }}
                            >
                                {this.props.header}
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Text
                                        style={styles.ae}
                                    >
                                        There are no reviews
                                    </Text>
                                </View>
                            </View>
                        </ScrollView>
                    )}
            </View>
        );
    }
}

export default connect(null, null)(ReviewsList);
