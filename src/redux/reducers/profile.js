// import Immutable from 'immutable';
//
// // @flow
// const defaultState: any = Immutable.Map({
// });
//
// /**
//  *  The profile redux reducer.
//  *
//  *  @param {any} state - The current state.
//  *  @param {any} action - The action.
//  */
// export default function reducer(state: any = defaultState, action: any) {
//     switch (action.type) {
//     case 'FETCH_PROFILE_START':
//         return state
//             .set(action.payload.profileId, {
//                 loading: true,
//             });
//
//     case 'FETCH_PROFILE_SUCCESS':
//         return state
//             .set(action.payload.profileId, {
//                 loading: false,
//                 data: action.payload.data,
//             });
//
//     case 'FOLLOW_PROFILE':
//         return state;
//
//     case 'UNFOLLOW_PROFILE':
//         return state;
//
//     default:
//         return state;
//     }
// }
