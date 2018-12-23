import firebase from 'react-native-firebase';

/**
 *  Initialize navigator root.
 *
 *  @param {number} placeId - The place id.
 */
function fetchPlace(placeId) {
    return async (dispatch, getState) => {
        const { place } = getState();
        if (place.get(placeId) === undefined) {
            dispatch({
                type: 'FETCH_PLACE_START',
                payload: {
                    placeId,
                },
            });

            firebase.database().ref(`/places/${placeId}`)
                .once('value', (snapshot) => {
                    if (snapshot && snapshot.val() !== null) {
                        dispatch({
                            type: 'FETCH_PLACE_SUCCESS',
                            payload: {
                                placeId,
                                data: snapshot.val(),
                            },
                        });
                    }
                }, (error) => {
                    console.warn(error);
                });
        }
    };
}

/**
 *  Follow a place.
 *
 *  @param {number} placeId - The place id.
 */
function followPlace(placeId) {
    return async (dispatch, getState) => {
        const { userContext } = getState();
        
        dispatch({
            type: 'FOLLOW_PLACE',
            payload: {
                placeId,
            },
        });

        // Sums 1 to the place
        firebase.database().ref(`/places/${placeId}/fans`)
            .transaction((value) => {
                const newValue = value + 1;
                return newValue;
            });

        // Sums 1 to the user
        firebase.database().ref(`/users/${userContext.get('user').id}/my_places`)
            .transaction((value) => {
                const newValue = value + 1;
                return newValue;
            });

        firebase.database().ref(`/followers/by_place/${placeId}/fans/${userContext.get('user').id}`)
            .set({
                created_at: firebase.database.ServerValue.TIMESTAMP,
            });

        firebase.database().ref(`/followers/by_user/${userContext.get('user').id}/my_places/${placeId}`)
            .set({
                created_at: firebase.database.ServerValue.TIMESTAMP,
            });
    };
}

/**
 *  Unfollow a place.
 *
 *  @param {number} placeId - The place id.
 */
function unfollowPlace(placeId) {
    return async (dispatch, getState) => {
        const { userContext } = getState();

        dispatch({
            type: 'UNFOLLOW_PLACE',
            payload: {
                placeId,
            },
        });

        // Sums 1 to the reviewer
        firebase.database().ref(`/places/${placeId}/fans`)
            .transaction((value) => {
                const newValue = value - 1;
                return newValue;
            });

        // Sums 1 to the user
        firebase.database().ref(`/users/${userContext.get('user').id}/my_places`)
            .transaction((value) => {
                const newValue = value - 1;
                return newValue;
            });

        firebase.database().ref(`/followers/by_place/${placeId}/fans/${userContext.get('user').id}`)
            .set(null);

        firebase.database().ref(`/followers/by_user/${userContext.get('user').id}/my_places/${placeId}`)
            .set(null);
    };
}

export const PlaceActions = {
    fetchPlace,
    followPlace,
    unfollowPlace,
};
