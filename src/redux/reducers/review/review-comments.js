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
    case 'FETCH_REVIEW_COMMENTS_SUCCESS':
        return state
            .set(action.payload.reviewId, {
                loading: false,
                comments: action.payload.results,
            });

    default:
        return state;
    }
}
