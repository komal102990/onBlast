import Immutable from 'immutable';

// @flow
const defaultState: any = Immutable.Map({
});

/**
 *  The profile redux reducer.
 *
 *  @param {any} state - The current state.
 *  @param {any} action - The action.
 */
export default function reducer(state: any = defaultState, action: any) {
    switch (action.type) {
    case 'FETCH_PROFILE_START':
        return state
            .set(action.payload.profileId, {
                loading: true,
            });

    case 'FETCH_PROFILE_SUCCESS':
        return state
            .set(action.payload.profileId, {
                loading: false,
                data: action.payload.data,
            });

    case 'FOLLOW_PROFILE':
        const newProfile = state.get(action.payload.profileId);
        newProfile.data.my_viewers += 1;
        return state
            .set(action.payload.profileId, newProfile);

    case 'UNFOLLOW_PROFILE':
        const newProfile2 = state.get(action.payload.profileId);
        newProfile2.data.my_viewers -= 1;
        return state
            .set(action.payload.profileId, newProfile2);

    default:
        return state;
    }
}
