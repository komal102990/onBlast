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
    case 'FETCH_PLACE_REVIEWS_START':
        return state
            .set(action.payload.placeId, {
                loading: true,
            });

    case 'FETCH_PLACE_REVIEWS_SUCCESS':
        return state
            .set(action.payload.placeId, {
                loading: false,
                reviews: Immutable.List(action.payload.results),
            });

    default:
        return state;
    }
}
