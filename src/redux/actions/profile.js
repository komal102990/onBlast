// import firebase from 'react-native-firebase';
//
// /**
//  *  Fetch a profile.
//  */
// function fetchProfile(profileId) {
//     return async (dispatch, getState) => {
//         const { profile } = getState();
//
//         if (profile.get(profileId) === undefined) {
//             dispatch({
//                 type: 'FETCH_PROFILE_START',
//                 payload: {
//                     profileId,
//                 },
//             });
//
//             firebase.database().ref(`/users/${profileId}`)
//                 .on('value', (snapshot) => {
//                     if (snapshot && snapshot.val() !== null) {
//                         dispatch({
//                             type: 'FETCH_PROFILE_SUCCESS',
//                             payload: {
//                                 profileId,
//                                 data: snapshot.val(),
//                             },
//                         });
//                     }
//                 }, (error) => {
//                     console.error(error);
//                 });
//         }
//     };
// }
//
// /**
//  *  Follow a profile.
//  */
// function followProfile(profileId) {
//     return async (dispatch, getState) => {
//         const { userContext } = getState();
//
//         dispatch({
//             type: 'FOLLOW_PROFILE',
//             payload: {
//                 profileId,
//             },
//         });
//
//         // Sums 1 to the reviewer
//         firebase.database().ref(`/users/${profileId}/my_viewers`)
//             .transaction((value) => {
//                 const newValue = value + 1;
//                 return newValue;
//             });
//
//         // Sums 1 to the user
//         firebase.database().ref(`/users/${userContext.get('user').id}/my_reviewers`)
//             .transaction((value) => {
//                 const newValue = value + 1;
//                 return newValue;
//             });
//
//         firebase.database().ref(`/followers/by_user/${profileId}/my_viewers/${userContext.get('user').id}`)
//             .set({
//                 created_at: firebase.database.ServerValue.TIMESTAMP,
//             });
//
//         firebase.database().ref(`/followers/by_user/${userContext.get('user').id}/my_reviewers/${profileId}`)
//             .set({
//                 created_at: firebase.database.ServerValue.TIMESTAMP,
//             });
//     };
// }
//
// /**
//  *  Unfollow a profile.
//  */
// function unfollowProfile(profileId) {
//     return async (dispatch, getState) => {
//         const { userContext } = getState();
//
//         dispatch({
//             type: 'UNFOLLOW_PROFILE',
//             payload: {
//                 profileId,
//             },
//         });
//
//         // Sums 1 to the reviewer
//         firebase.database().ref(`/users/${profileId}/my_viewers`)
//             .transaction((value) => {
//                 const newValue = value - 1;
//                 return newValue;
//             });
//
//         // Sums 1 to the user
//         firebase.database().ref(`/users/${userContext.get('user').id}/my_reviewers`)
//             .transaction((value) => {
//                 const newValue = value - 1;
//                 return newValue;
//             });
//
//         firebase.database().ref(`/followers/by_user/${profileId}/my_viewers/${userContext.get('user').id}`)
//             .set(null);
//
//         firebase.database().ref(`/followers/by_user/${userContext.get('user').id}/my_reviewers/${profileId}`)
//             .set(null);
//     };
// }
//
// export const ProfileActions = {
//     fetchProfile,
//     followProfile,
//     unfollowProfile,
// };
