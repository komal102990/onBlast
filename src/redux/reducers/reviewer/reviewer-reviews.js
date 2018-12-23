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
    case 'FETCH_REVIEWER_REVIEWS_START':
        return state
            .set(action.payload.reviewerId, {
                loading: true,
            });

    case 'FETCH_REVIEWER_REVIEWS_SUCCESS':
        return state
            .set(action.payload.reviewerId, {
                loading: false,
                reviews: Immutable.List(action.payload.results),
            });

    default:
        return state;
    }
}
