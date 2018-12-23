import Immutable from 'immutable';

// @flow
const defaultState: any = Immutable.Map({
});

/**
 *  The auth redux reducer.
 *
 *  @param {any} state - The current state.
 *  @param {any} action - The action.
 */
export default function reducer(state: any = defaultState, action: any) {
    switch (action.type) {
    case 'FETCH_REVIEW_START':
        return state
            .set(action.payload.reviewId, {
                loading: true,
            });

    case 'FETCH_REVIEW_SUCCESS':
        return state
            .set(action.payload.reviewId, {
                loading: false,
                data: action.payload.data,
            });

    case 'LIKE_REVIEW':
        return state;

    case 'UNLIKE_REVIEW':
        return state;

    default:
        return state;
    }
}
