import firebase from 'react-native-firebase';
import _ from 'lodash';

/**
 *  Get results ordered.
 *
 *  @param {Object} results - The resultset.
 */
function orderBy(results) {
    const arr = Object.keys(results).map(uid => ({
        ...results[uid],
        uid,
    }));

    const sorted = _.orderBy(arr,
        [review => review.created_at], ['desc'],
    );

    return {
        results: sorted.map(item => item.uid),
        last: sorted[sorted.length - 1].created_at,
    };
}

/**
 *  Fetch review comments.
 *
 *  @param {number} reviewId - The review id.
 */
function fetchComments(reviewId) {
    return async (dispatch) => {
        dispatch({
            type: 'FETCH_REVIEW_COMMENTS_START',
            payload: {
                reviewId,
            },
        });

        firebase.database().ref(`/comments/${reviewId}`)
            .orderByChild('created_at')
            .once('value', (snapshot) => {
                if (snapshot && snapshot.val() !== null) {
                    const { results, last } = orderBy(snapshot.val());

                    dispatch({
                        type: 'FETCH_REVIEW_COMMENTS_SUCCESS',
                        payload: {
                            reviewId,
                            results,
                            last,
                            more: false,
                        },
                    });
                } else {
                    dispatch({
                        type: 'FETCH_REVIEW_COMMENTS_SUCCESS',
                        payload: {
                            reviewId,
                            results: [],
                            more: false,
                        },
                    });
                }
            });
    };
}


export const ReviewCommentsActions = {
    fetchComments,
};
