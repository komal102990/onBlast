import firebase from 'react-native-firebase';
import { ReviewerActions, PlaceActions } from 'src/redux/actions';

/**
 *  Fetch a review.
 */
function fetchReview(reviewId) {
    return async (dispatch) => {
        dispatch({
            type: 'FETCH_REVIEW_START',
            payload: {
                reviewId,
            },
        });

        firebase.database().ref(`/reviews/${reviewId}`)
            .once('value', (reviewSnapshot) => {
                if (reviewSnapshot && reviewSnapshot.val() !== null) {
                    dispatch(ReviewerActions.fetchProfile(reviewSnapshot.val().reviewer));
                    dispatch(PlaceActions.fetchPlace(reviewSnapshot.val().place));
                    dispatch({
                        type: 'FETCH_REVIEW_SUCCESS',
                        payload: {
                            reviewId,
                            data: reviewSnapshot.val(),
                        },
                    });
                }
            }, (error) => {
                console.error(error);
            });
    };
}

/**
 *  Viewed review.
 */
function viewedReview(reviewId) {
    return async (dispatch, getState) => {
        const { review } = getState();

        // Sums 1 to the views of the reviewer
        firebase.database().ref(`/users/${review.get(reviewId).data.reviewer}/my_views`)
            .transaction((value) => {
                const newValue = value + 1;
                return newValue;
            });

        // Sums 1 to the views of the place
        firebase.database().ref(`/places/${review.get(reviewId).data.place}/views`)
            .transaction((value) => {
                const newValue = value + 1;
                return newValue;
            });

        // Sums 1 to the views of the review
        firebase.database().ref(`/reviews/${reviewId}/views`)
            .transaction((value) => {
                const newValue = value + 1;
                return newValue;
            });
    };
}

/**
 *  Like review.
 */
function likeReview(reviewId) {
    return async (dispatch, getState) => {
        const { userContext } = getState();
        dispatch({
            type: 'LIKE_REVIEW',
            payload: {
                reviewId,
            },
        });

        // Sums 1 to the likes of the review
        firebase.database().ref(`/reviews/${reviewId}/likes`)
            .transaction((value) => {
                const newValue = value + 1;
                return newValue;
            });
        firebase.database().ref(`/likes/${reviewId}/${userContext.get('user').id}`)
            .set({
                created_at: firebase.database.ServerValue.TIMESTAMP,
            });
    };
}

/**
 *  Unlike review.
 */
function unlikeReview(reviewId) {
    return async (dispatch, getState) => {
        const { userContext } = getState();
        dispatch({
            type: 'UNLIKE_REVIEW',
            payload: {
                reviewId,
            },
        });

        // Sums 1 to the likes of the review
        firebase.database().ref(`/reviews/${reviewId}/likes`)
            .transaction((value) => {
                const newValue = value - 1;
                return newValue;
            });

        firebase.database().ref(`/likes/${reviewId}/${userContext.get('user').id}`)
            .set(null);
    };
}

export const ReviewActions = {
    fetchReview,
    viewedReview,
    likeReview,
    unlikeReview,
};
