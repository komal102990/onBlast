import React, { PureComponent } from 'react';
import { Image, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { View, Icon } from 'native-base';
import { Theme } from 'src/styles';
import { AnTouchable } from 'src/components/common';
import Video from 'react-native-video';
import { ReviewActions } from 'src/redux/actions';
import ReviewSingleItemInfoBar from './ReviewSingleItemInfoBar';
import ReviewSingleItemMenu from './ReviewSingleItemMenu';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        width,
        height: height / 2,
        backgroundColor: '#ccc',
    },

    video: {
        width,
        height: height / 2,
    },

    previewImage: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width,
        height: height / 2,
    },

    reviewTypeIconContainer: {
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 10,
        width: 35,
        height: 35,
        borderRadius: 17.5,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingContainer: {
        position: 'absolute',
        top: 20,
        right: 10,
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    reviewTypeIcon: {
        color: '#fff',
    },

    likesContainer: {
        position: 'absolute',
        bottom: 45,
        right: 70,
    },

    likesIcon: {
        fontSize: 35,
    },
});

class ReviewSingleItem extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            play: false,
            loading: false,
            like: null,
        };

        this.onRefVideo = this.onRefVideo.bind(this);
        this.onEndVideo = this.onEndVideo.bind(this);
        this.onLoadStartVideo = this.onLoadStartVideo.bind(this);
        this.onProgressVideo = this.onProgressVideo.bind(this);
        this.onBufferVideo = this.onBufferVideo.bind(this);
        this.onLoadVideo = this.onLoadVideo.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onMessagesClicked = this.props.onMessagesClicked.bind(this);
        this.onProfilePress = this.props.onProfilePress.bind(this);
        this.onPlacePress = this.props.onPlacePress.bind(this);
    }

    componentDidMount() {
        if (this.props.context.get('user')) {
            firebase.database().ref(`likes/${this.props.reviewId}/${this.props.context.get('user').id}`)
                .on('value', (snapshot) => {
                    if (snapshot.val() !== null) {
                        this.setState({
                            like: true,
                        });
                    } else {
                        this.setState({
                            like: false,
                        });
                    }
                });
        }
        this.props.fetchReview(this.props.reviewId);
    }

    onRefVideo(ref) {
        this.player = ref;
    }

    onEndVideo() {
        this.player.seek(0);
        this.props.viewedReview(this.props.reviewId);
    }

    onLoadStartVideo(event) {
        this.setState({
            loading: true,
        });
    }
    onBufferVideo() {
    }

    onProgressVideo(event) {
    }

    onLoadVideo() {
        this.setState({
            loading: false,
        });
    }

    onToggleLike() {
        if (this.state.like) {
            this.setState({
                like: false,
            });
            this.props.unlikeReview(this.props.reviewId);
        } else {
            this.setState({
                like: true,
            });
            this.props.likeReview(this.props.reviewId);
        }
    }

    play() {
        if (!this.state.play) {
            this.setState({
                play: true,
            });
        }
    }

    stop() {
        if (this.state.play) {
            this.setState({
                play: false,
            });
        }
    }

    render() {
        if (!this.props.review ||
            !this.props.review.data ||
            !this.props.reviewer ||
            !this.props.reviewer.data ||
            !this.props.place ||
            !this.props.place.data ||
            this.state.like === null
        ) {
            return (
                <View
                    style={styles.container}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: '#ccc',
                        }}
                    />
                </View>
            );
        }
        return (
            <View>
                <View
                    style={styles.container}
                >
                    {(this.state.play) ? (
                        <Video
                            ref={this.onRefVideo}
                            source={{
                                uri: this.props.review.data.video,
                            }}
                            style={styles.video}
                            paused={false}
                            resizeMode="cover"
                            onLoad={this.onLoadVideo}
                            onBuffer={this.onBufferVideo}
                            onEnd={this.onEndVideo}
                            onLoadStart={this.onLoadStartVideo}
                            onProgress={this.onProgressVideo}
                            onError={err => requestAnimationFrame(() => {
                                console.log(err);
                            })}
                        />
                    ) : (
                        <View>
                            <Image
                                source={{
                                    uri: (this.props.review.data.preview) ?
                                        this.props.review.data.preview : '',
                                }}
                                style={styles.previewImage}
                                resizeMode="cover"
                            />
                        </View>
                    )}

                    {(this.state.loading) ? (
                        <View
                            style={styles.loadingContainer}
                        >
                            <ActivityIndicator
                                size="small"
                                color={Theme.Colors.Primary}
                            />
                        </View>
                    ) : null}

                    <View
                        style={[
                            styles.reviewTypeIconContainer, {
                                backgroundColor: (this.props.review.data.good) ? 'green' : 'red',
                            },
                        ]}
                    >
                        <Icon
                            type="Foundation"
                            name="like"
                            style={[
                                styles.reviewTypeIcon, {
                                    transform: [{
                                        rotate: (this.props.review.data.good) ? '0deg' : '180deg',
                                    }],
                                },
                            ]}
                        />
                    </View>

                    <ReviewSingleItemMenu
                        reviewId={this.props.reviewId}
                        likes={this.props.review.data.likes}
                        messagesButton={this.props.messagesButton}
                        onMessagesClicked={this.props.onMessagesClicked}
                        videoUrl={this.props.review.data.video}
                    />

                    <ReviewSingleItemInfoBar
                        reviewerId={this.props.review.data.reviewer}
                        reviewerName={`${this.props.reviewer.data.name} ${this.props.reviewer.data.surname}`}
                        reviewerAvatar={this.props.reviewer.data.avatar}
                        placeId={this.props.review.data.place}
                        placeName={this.props.place.data.name}
                        views={this.props.review.data.views}
                        onProfilePress={this.props.onProfilePress}
                        onPlacePress={this.props.onPlacePress}
                    />

                    <AnTouchable
                        style={styles.likesContainer}
                        activeOpacity={1}
                        onPress={this.onToggleLike}
                    >
                        <Icon
                            type="FontAwesome"
                            name={(this.state.like) ? 'heart' : 'heart-o'}
                            style={[
                                styles.likesIcon, {
                                    color: Theme.Colors.Primary,
                                },
                            ]}
                        />
                    </AnTouchable>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state, props) => {
    if (state.review.get(props.reviewId) && !state.review.get(props.reviewId).loading) {
        return {
            review: state.review.get(props.reviewId),
            context: state.userContext,
            reviewer: state.reviewer.get(state.review.get(props.reviewId).data.reviewer),
            place: state.place.get(state.review.get(props.reviewId).data.place),
        };
    }
    return {
        review: state.review.get(props.reviewId),
        context: state.userContext,
        reviewer: null,
        place: null,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchReview: reviewId => dispatch(ReviewActions.fetchReview(reviewId)),
    likeReview: reviewId => dispatch(ReviewActions.likeReview(reviewId)),
    unlikeReview: reviewId => dispatch(ReviewActions.unlikeReview(reviewId)),
    viewedReview: reviewId => dispatch(ReviewActions.viewedReview(reviewId)),
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(ReviewSingleItem);
