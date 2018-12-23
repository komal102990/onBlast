import { combineReducers } from 'redux';
import nav from './nav';
import homeFeed from './feeds/home-feed';
import placesFeed from './feeds/places-feed';
import reviewersFeed from './feeds/reviewers-feed';
import reviewer from './reviewer/reviewer';
import reviewerReviews from './reviewer/reviewer-reviews';
import place from './place/place';
import placeReviews from './place/place-reviews';
import review from './review/review';
import reviewComments from './review/review-comments';
import userContext from './user-context';

const rootReducer = combineReducers({
    nav,
    homeFeed,
    placesFeed,
    reviewersFeed,
    reviewer,
    reviewerReviews,
    place,
    placeReviews,
    review,
    reviewComments,
    userContext,
});

export default rootReducer;
