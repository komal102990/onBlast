import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import { View, Text } from 'native-base';
import { Theme } from 'src/styles';
import ReviewCommentUser from 'src/components/comment/ReviewCommentUser';

const styles = StyleSheet.create({
    aa: {
        marginBottom: 10,
    },
    ab: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
        fontFamily: Theme.Fonts.RobotoRegular,
    },
});

class ReviewCommentItem extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            comment: '',
        };
    }

    componentDidMount() {
        firebase.database().ref(`comments/${this.props.reviewId}/${this.props.commentId}`)
            .once('value', (snapshot) => {
                if (snapshot && snapshot.val() !== null) {
                    const comment = snapshot.val();

                    this.setState({
                        user: comment.user,
                        comment: comment.comment,
                    });
                }
            });
    }

    render() {
        return (
            <View
                style={styles.aa}
            >
                <ReviewCommentUser
                    userId={this.state.user}
                />

                <Text
                    style={styles.ab}
                >
                    {this.state.comment}
                </Text>
            </View>
        );
    }
}

export default ReviewCommentItem;
