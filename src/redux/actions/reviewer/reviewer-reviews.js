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
 *  Fetch reviewer reviews.
 *
 *  @param {number} reviewerId - The reviewer id.
 */
function fetchReviews(reviewerId) {
    return async (dispatch) => {
        dispatch({
            type: 'FETCH_REVIEWER_REVIEWS_START',
            payload: {
                reviewerId,
            },
        });

        firebase.database().ref('/reviews')
            .orderByChild('reviewer')
            .equalTo(reviewerId)
            .once('value', (snapshot) => {
                if (snapshot && snapshot.val() !== null) {
                    const { results, last } = orderBy(snapshot.val());

                    dispatch({
                        type: 'FETCH_REVIEWER_REVIEWS_SUCCESS',
                        payload: {
                            reviewerId,
                            results,
                            last,
                            more: false,
                        },
                    });
                } else {
                    dispatch({
                        type: 'FETCH_REVIEWER_REVIEWS_SUCCESS',
                        payload: {
                            reviewerId,
                            results: [],
                            more: false,
                        },
                    });
                }
            });
    };
}


export const ReviewerReviewsActions = {
    fetchReviews,
};
