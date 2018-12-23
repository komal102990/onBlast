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
    case 'FETCH_PLACE_START':
        return state
            .set(action.payload.placeId, {
                loading: true,
            });

    case 'FETCH_PLACE_SUCCESS':
        return state
            .set(action.payload.placeId, {
                loading: false,
                data: action.payload.data,
            });

    case 'FOLLOW_PLACE':
        const newPlace = state.get(action.payload.placeId);
        newPlace.data.fans += 1;
        return state
            .set(action.payload.profileId, newPlace);
    
    case 'UNFOLLOW_PLACE':
        const newPlace2 = state.get(action.payload.placeId);
        newPlace2.data.fans -= 1;
        return state
            .set(action.payload.profileId, newPlace2);

    default:
        return state;
    }
}
