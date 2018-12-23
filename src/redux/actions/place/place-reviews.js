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
 *  Fetch place reviews.
 *
 *  @param {number} placeId - The place id.
 */
function fetchReviews(placeId) {
    return async (dispatch) => {
        dispatch({
            type: 'FETCH_PLACE_REVIEWS_START',
            payload: {
                placeId,
            },
        });

        firebase.database().ref('/reviews')
            .orderByChild('place')
            .equalTo(placeId)
            .once('value', (snapshot) => {
                if (snapshot && snapshot.val() !== null) {
                    const { results, last } = orderBy(snapshot.val());

                    dispatch({
                        type: 'FETCH_PLACE_REVIEWS_SUCCESS',
                        payload: {
                            placeId,
                            results,
                            last,
                            more: false,
                        },
                    });
                } else {
                    dispatch({
                        type: 'FETCH_PLACE_REVIEWS_SUCCESS',
                        payload: {
                            placeId,
                            results: [],
                            more: false,
                        },
                    });
                }
            });
    };
}


export const PlaceReviewsActions = {
    fetchReviews,
};
