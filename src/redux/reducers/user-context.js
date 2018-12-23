import Immutable from 'immutable';

// @flow
const defaultState = Immutable.Map({
    loading: false,
    user: null,
});

/**
 *  The user context redux reducer.
 *
 *  @param {any} state - The current state.
 *  @param {any} action - The action.
 */
export default function reducer(state: any = defaultState, action: any) {
    switch (action.type) {
    case 'FETCH_USER_CONTEXT_START':
        return state
            .set('loading', true);

    case 'FETCH_USER_CONTEXT_SUCCESS':
        return state
            .set('loading', false)
            .set('user', action.payload.user);

    case 'ERASE_USER_CONTEXT':
        return state
            .set('loading', false)
            .set('user', null);

    default:
        return state;
    }
}
