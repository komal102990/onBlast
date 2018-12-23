/* eslint-disable */
import { Navigation } from 'react-native-navigation';


import SignOutButton from 'src/components/header-buttons/SignOutButton'; // eslint-disable-line
import CloseButton from 'src/components/header-buttons/CloseButton'; // eslint-disable-line
import SearchBar from 'src/components/header-buttons/SearchBar'; // eslint-disable-line
import SearchButton from 'src/components/header-buttons/SearchButton'; // eslint-disable-line
import MenuButton from 'src/components/header-buttons/MenuButton'; // eslint-disable-line
import NotificationButton from 'src/components/header-buttons/NotificationButton'; // eslint-disable-line
import NavigationBar from 'src/components/header-buttons/NavigationBar'; // eslint-disable-line
import NonSecuredScreenHOC from 'src/screens/non-secured/_/NonSecuredScreenHOC';
import SecuredScreenHOC from 'src/screens/secured/_/SecuredScreenHOC';
import SignInScreen from 'src/screens/non-secured/SignInScreen';
import SignUpScreen from 'src/screens/non-secured/SignUpScreen';
import ForgotYourPasswordScreen from 'src/screens/non-secured/ForgotYourPasswordScreen';
import HomeFeedScreen from 'src/screens/secured/HomeFeedScreen';
import MyPlacesFeedScreen from 'src/screens/secured/MyPlacesFeedScreen';
import MyReviewersFeedScreen from 'src/screens/secured/MyReviewersFeedScreen';
import ReviewerScreen from 'src/screens/secured/ReviewerScreen';
import ProfileScreen from 'src/screens/secured/ProfileScreen';
import SearchScreen from 'src/screens/secured/SearchScreen';
import SearchMySpotScreen from 'src/screens/secured/SearchMySpotScreen';
import CameraScreen from 'src/screens/secured/blast/CameraScreen';
import SelectBlastPlaceModal from 'src/screens/secured/blast/modals/SelectBlastPlaceModal';
import SelectBlastCaptionModal from 'src/screens/secured/blast/modals/SelectBlastCaptionModal';
import VideoScreen from 'src/screens/secured/VideoScreen';
import LiveScreen from 'src/screens/secured/LiveScreen';
import PlaceScreen from 'src/screens/secured/PlaceScreen';
import NotificationScreen from 'src/screens/secured/NotificationScreen';

/**
 *  Register Screens.
 *
 *  @param {Object} Store - The redux store.
 *  @param {Object} Provider - The redux provider.
 */
export default function registerScreens(Store, Provider) {
    Navigation.registerComponent('SignInScreen', () => NonSecuredScreenHOC(SignInScreen), Store, Provider);
    Navigation.registerComponent('SignUpScreen', () => NonSecuredScreenHOC(SignUpScreen), Store, Provider);
    Navigation.registerComponent('ForgotYourPasswordScreen', () => NonSecuredScreenHOC(ForgotYourPasswordScreen), Store, Provider);
    Navigation.registerComponent('HomeFeedScreen', () => SecuredScreenHOC(HomeFeedScreen), Store, Provider);
    Navigation.registerComponent('MyPlacesFeedScreen', () => SecuredScreenHOC(MyPlacesFeedScreen), Store, Provider);
    Navigation.registerComponent('CameraScreen', () => SecuredScreenHOC(CameraScreen), Store, Provider);
    Navigation.registerComponent('SelectBlastPlaceModal', () => SecuredScreenHOC(SelectBlastPlaceModal), Store, Provider);
    Navigation.registerComponent('SelectBlastCaptionModal', () => SecuredScreenHOC(SelectBlastCaptionModal), Store, Provider);
    Navigation.registerComponent('LiveScreen', () => SecuredScreenHOC(LiveScreen), Store, Provider);
    Navigation.registerComponent('ReviewerScreen', () => SecuredScreenHOC(ReviewerScreen), Store, Provider);
    Navigation.registerComponent('ProfileScreen', () => SecuredScreenHOC(ProfileScreen), Store, Provider);
    Navigation.registerComponent('MyReviewersFeedScreen', () => SecuredScreenHOC(MyReviewersFeedScreen), Store, Provider);
    Navigation.registerComponent('SearchScreen', () => SecuredScreenHOC(SearchScreen), Store, Provider);
    Navigation.registerComponent('SearchMySpotScreen', () => SecuredScreenHOC(SearchMySpotScreen), Store, Provider);
    Navigation.registerComponent('VideoScreen', () => SecuredScreenHOC(VideoScreen), Store, Provider);
    Navigation.registerComponent('PlaceScreen', () => SecuredScreenHOC(PlaceScreen), Store, Provider);
    Navigation.registerComponent('NotificationScreen', () => SecuredScreenHOC(NotificationScreen), Store, Provider);
}
