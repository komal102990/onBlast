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
 *  Fetch places reviews.
 */
function fetchReviews() {
    return async (dispatch, getState) => {
        const { placesFeed, userContext } = getState();

        dispatch({
            type: 'FETCH_PLACES_FEED_REVIEWS_START',
        });

        firebase.database().ref(`/feed/by_place/${userContext.get('user').id}`)
            .orderByChild('created_at')
            .endAt(placesFeed.get('lastReview') ? placesFeed.get('lastReview') - 1 : 99999999999999)
            .limitToLast(5)
            .once('value', (snapshot) => {
                if (snapshot && snapshot.val() !== null) {
                    let more = true;

                    if (snapshot.numChildren() < placesFeed.get('pageSize')) {
                        more = false;
                    }

                    const { results, last } = orderBy(snapshot.val());

                    dispatch({
                        type: 'FETCH_PLACES_FEED_REVIEWS_SUCCESS',
                        payload: {
                            results,
                            last,
                            more,
                        },
                    });
                } else {
                    dispatch({
                        type: 'FETCH_PLACES_FEED_REVIEWS_SUCCESS',
                        payload: {
                            results: [],
                            more: false,
                        },
                    });
                }
            });
    };
}

/**
 *  Refresh reviews.
 */
function refreshReviews() {
    return async (dispatch, getState) => {
        const { placesFeed, userContext } = getState();

        dispatch({
            type: 'REFRESH_PLACES_FEED_REVIEWS_START',
        });

        firebase.database().ref(`/feed/by_place/${userContext.get('user').id}`)
            .orderByChild('created_at')
            .endAt(99999999999999)
            .limitToLast(5)
            .once('value', (snapshot) => {
                if (snapshot && snapshot.val() !== null) {
                    let more = true;

                    if (snapshot.numChildren() < placesFeed.get('pageSize')) {
                        more = false;
                    }

                    const { results, last } = orderBy(snapshot.val());

                    dispatch({
                        type: 'REFRESH_PLACES_FEED_REVIEWS_SUCCESS',
                        payload: {
                            results,
                            last,
                            more,
                        },
                    });
                } else {
                    dispatch({
                        type: 'REFRESH_PLACES_FEED_REVIEWS_SUCCESS',
                        payload: {
                            results: [],
                            more: false,
                        },
                    });
                }
            });
    };
}

export const PlacesFeedActions = {
    fetchReviews,
    refreshReviews,
};
