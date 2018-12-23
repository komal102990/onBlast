// @flow
const defaultState: any = {
    root: undefined,
};

/**
 *  The auth redux reducer.
 *
 *  @param {any} state - The current state.
 *  @param {any} action - The action.
 */
export default function reducer(state: any = defaultState, action: any) {
    switch (action.type) {
    case 'ROOT_CHANGED':
        return Object.assign({}, state, {
            root: action.root,
        });

    default:
        return state;
    }
}
