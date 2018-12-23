import firebase from 'react-native-firebase';

/**
 *  Fetch user context.
 */
function fetchUserContext(profileId) {
    return async (dispatch) => {
        dispatch({
            type: 'FETCH_USER_CONTEXT_START',
        });

        firebase.database().ref(`/users/${profileId}`)
            .on('value', (snapshot) => {
                if (snapshot && snapshot.val() !== null) {
                    dispatch({
                        type: 'FETCH_USER_CONTEXT_SUCCESS',
                        payload: {
                            user: {
                                ...snapshot.val(),
                                id: snapshot.key,
                            },
                        },
                    });
                }
            }, (error) => {
                console.error(error);
            });
    };
}

/**
 * Erase user context
 */
function eraseUserContext() {
    return async (dispatch, getState) => {
        const { userContext } = getState();
        firebase.database().ref(`/users/${userContext.get('user').id}`)
            .off('value');
        dispatch({
            type: 'ERASE_USER_CONTEXT',
        });
    };
}

export const UserContextActions = {
    fetchUserContext,
    eraseUserContext,
};
