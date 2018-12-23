/**
 *  Change navigator root.
 *
 *  @param {any} root - The root key.
 */
function changeAppRoot(root) {
    return {
        type: 'ROOT_CHANGED',
        root,
    };
}

/**
 *  Initialize navigator root.
 */
function appInitialized(root) {
    return async (dispatch) => {
        dispatch(changeAppRoot(root));
    };
}

export const NavActions = {
    changeAppRoot,
    appInitialized,
};
