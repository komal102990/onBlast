import Immutable from 'immutable';

// @flow
const defaultState = Immutable.Map({
    refreshing: false,
    reviews: Immutable.List([]),
    pageSize: 2,
    lastReview: null,
    more: true,
});

/**
 *  The auth redux reducer.
 *
 *  @param {any} state - The current state.
 *  @param {any} action - The action.
 */
export default function reducer(state = defaultState, action) {
    switch (action.type) {
    case 'FETCH_HOME_REVIEWS_SUCCESS':
        return state
            .set('page', state.get('page') + 1)
            .set('reviews', state.get('reviews').concat(action.payload.results))
            .set('lastReview', (action.payload.last) ? action.payload.last : state.get('lastReview'))
            .set('more', action.payload.more);

    case 'REFRESH_HOME_REVIEWS_START':
        return state
            .set('refreshing', true)
            .set('more', true)
            .set('lastReview', null)
            .set('reviews', Immutable.List([]));

    case 'REFRESH_HOME_REVIEWS_SUCCESS':
        return state
            .set('refreshing', false)
            .set('reviews', state.get('reviews').concat(action.payload.results))
            .set('lastReview', (action.payload.last) ? action.payload.last : state.get('lastReview'))
            .set('more', action.payload.more);

    default:
        return state;
    }
}
