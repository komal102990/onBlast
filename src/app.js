import { Provider } from 'react-redux';
import store from 'src/redux';
import { Navigation } from 'react-native-navigation';
import registerScreens from 'src/screens';
import { NavActions, UserContextActions } from 'src/redux/actions';
import Images from '@assets';
import firebase from 'react-native-firebase';
import SplashScreen from 'react-native-splash-screen';


registerScreens(store, Provider);

export default class App {
    constructor() {
        if (__DEV__) {
            XMLHttpRequest = GLOBAL.originalXMLHttpRequest
                ? GLOBAL.originalXMLHttpRequest
                : GLOBAL.XMLHttpRequest;
        }

        /**
         *  Keep current app
         *  root.
         */

        this.currentRoot = null;

        /**
         *  Keep curret context
         *  id.
         */

        this.currentContextId = null;

        store.subscribe(this.onStoreUpdate.bind(this));

        /**
         *  Listen to auth state change to
         *  define app way initialization.
         */

        this.authStateListener = firebase.auth()
            .onAuthStateChanged((user) => {
                if (user) {
                    store.dispatch(
                        UserContextActions.fetchUserContext(user._user.uid),
                    );
                } else {
                    store.dispatch(NavActions.appInitialized('login'));
                }

                /**
                 *  Remove listener after
                 *  first call.
                 */

                if (typeof this.authStateListener === 'function') {
                    this.authStateListener();
                }
            });
    }

    onStoreUpdate() {
        const { root } = store.getState().nav;

        if (this.currentRoot !== root) {
            this.currentRoot = root;
            this.constructor.startApp(root);
        }

        /* --------------
         *  Listen for context state
         *  changes for swipe between
         *  app stacks.
         ----------------------------- */

        const user = store.getState().userContext.get('user');

        if (!this.currentContextId && user) {
            // Set current root to null to
            // allow root change.
            this.currentRoot = null;

            // Use user id to set set a
            // current context identifier.
            this.currentContextId = user.id;

            // Throw root change to secured
            // stack.
            store.dispatch(NavActions.appInitialized('secured'));

            // Hide splash screen
            SplashScreen.hide();
        } else if (this.currentContextId && !user) {
            // Set current root to null to
            // allow root change.
            this.currentRoot = null;

            // Clear current context
            // identifier.
            this.currentContextId = null;

            // Throw root change to non-secured
            // stack.
            store.dispatch(NavActions.appInitialized('login'));
        }
    }


    static startApp(root) {
        switch (root) {
        case 'login':
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'SignInScreen',
                },
                animationType: 'fade',
                appStyle: {
                    orientation: 'portrait',
                },
            });

            break;
        case 'secured':
            Navigation.startTabBasedApp({
                tabs: [
                    {
                        screen: 'HomeFeedScreen',
                        icon: Images.home,
                    },

                    {
                        screen: 'MyPlacesFeedScreen',
                        icon: Images.home,
                    },

                    {
                        screen: 'ReviewerScreen',
                        icon: Images.home,
                    },

                    {
                        screen: 'MyReviewersFeedScreen',
                        icon: Images.home,
                    },
                ],
                animationType: 'fade',
                appStyle: {
                    orientation: 'portrait',
                    navBarTitleTextCentered: true,
                },
            });

            break;
        default:
            // Nothing to do ...
        }
    }
}
