import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, Dimensions, Keyboard } from 'react-native';
import { Content, View, Text, Icon } from 'native-base';
import { Theme } from 'src/styles';
import { ReviewActions, ReviewCommentsActions } from 'src/redux/actions';
import { AnTouchable } from 'src/components/common';
import ReviewSingleItem from 'src/components/review/ReviewSingleItem';
import firebase from 'react-native-firebase';
import ReviewCommentItem from 'src/components/comment/ReviewCommentItem';

const { width } = Dimensions.get('window');

class VideoScreen extends Component {
    static navigatorStyle = {
        ...Theme.Nav.Primary,
        tabBarHidden: true,
        tabBarTranslucent: true,
        drawUnderTabBar: true,
    }

    constructor(props) {
        super(props);

        this.video = null;

        this.onRenderEmptyComponent = this.onRenderEmptyComponent.bind(this);
        this.onRenderHeaderComponent = this.onRenderHeaderComponent.bind(this);
        this.onRowRenderer = this.onRowRenderer.bind(this);
    }

    componentDidMount() {
        this.props.navigator.setTitle({
            title: 'Video',
        });

        this.props.fetchReview(this.props.reviewId);
        this.props.fetchComments(this.props.reviewId);

        setTimeout(() => {
            if (this.video) {
                this.video.play();
            }
        }, 1500);
    }

    onRenderEmptyComponent() {
        return (
            <View
                style={{
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontFamily: Theme.Fonts.RobotoRegular,
                    }}
                >
                    There are no comments for this review ...
                </Text>
            </View>
        );
    }

    onRenderHeaderComponent() {
        return (
            <View
                style={{
                    padding: 15,
                    backgroundColor: Theme.Colors.Primary,
                    marginBottom: 20,
                    borderRadius: 3,
                }}
            >
                <Text
                    style={{
                        fontFamily: Theme.Fonts.RobotoRegular,
                        fontSize: 14,
                        lineHeight: 20,
                        flex: 1,
                        color: '#fff',
                    }}
                >
                    { this.props.review.data.caption }
                </Text>
            </View>
        );
    }

    onRowRenderer(data) {
        return (
            <ReviewCommentItem
                reviewId={this.props.reviewId}
                commentId={data.item}
            />
        );
    }

    render() {
        return (
            <Content
                scrollEnabled={false}
                contentContainerStyle={{
                    flex: 1,
                }}
                style={{
                    flex: 1,
                }}
            >
                <ReviewSingleItem
                    ref={(ref) => {
                        if (ref) {
                            this.video = ref.getWrappedInstance();
                        }
                    }}
                    reviewId={this.props.reviewId}
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
                    onMessagesClicked={() => {

                    }}
                />

                {
                    (this.props.review && this.props.review.data && (
                        <View
                            style={{
                                flex: 1,
                                padding: 8,
                                backgroundColor: '#fff',
                            }}
                        >
                            <FlatList
                                contentContainerStyle={{
                                    marginBottom: 60,
                                    paddingBottom: 40,
                                }}
                                showsVerticalScrollIndicator={false}
                                ListEmptyComponent={this.onRenderEmptyComponent}
                                ListHeaderComponent={this.onRenderHeaderComponent}
                                keyExtractor={item => (
                                    item
                                )}
                                data={this.props.comments}
                                renderItem={this.onRowRenderer}
                                renderAheadOffset={2000}
                            />

                            <AnTouchable
                                style={{
                                    width,
                                    height: 50,
                                    backgroundColor: Theme.Colors.Primary,
                                    position: 'absolute',
                                    bottom: 0,
                                    zIndex: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.props.navigator.showModal({
                                        screen: 'SelectBlastCaptionModal',
                                        navigatorButtons: {
                                            leftButtons: [{}],
                                        },
                                        passProps: {
                                            title: 'Leave a comment',
                                            caption: '',
                                            onRequestClose: () => {
                                                Keyboard.dismiss();

                                                this.props.navigator.dismissModal();
                                            },
                                            onSelectCaption: (caption) => {
                                                Keyboard.dismiss();

                                                this.props.navigator.dismissModal();

                                                firebase.database().ref(`comments/${this.props.reviewId}`).push({
                                                    created_at: firebase.database.ServerValue.TIMESTAMP,
                                                    user: this.props.context.id,
                                                    comment: caption,
                                                })
                                                    .then(() => {
                                                        this.props.fetchComments(this.props.reviewId);
                                                    });
                                            },
                                        },
                                    });
                                }}
                            >
                                <Icon
                                    type="FontAwesome"
                                    name="comment"
                                    style={{
                                        color: '#fff',
                                        fontSize: 21,
                                        marginRight: 10,
                                    }}
                                />

                                <Text
                                    style={{
                                        color: '#fff',
                                        fontFamily: Theme.Fonts.RobotoRegular,
                                    }}
                                >
                                    Leave a comment
                                </Text>
                            </AnTouchable>
                        </View>
                    ))
                }
            </Content>
        );
    }
}

const mapStateToProps = (state, props) => ({
    context: state.userContext.get('user'),
    review: state.review.get(props.reviewId),
    comments: (state.reviewComments.get(props.reviewId)) ? state.reviewComments.get(props.reviewId).comments : [],
});

const mapDispatchToProps = dispatch => ({
    fetchReview: reviewId => dispatch(ReviewActions.fetchReview(reviewId)),
    fetchComments: reviewId => dispatch(ReviewCommentsActions.fetchComments(reviewId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoScreen);
