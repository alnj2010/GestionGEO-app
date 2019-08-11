import { combineReducers } from 'redux';
import snackbarReducer from './snackbar';
import userReducer from './user';
import playerReducer from './player';
import categoryReducer from './category';
import triviaCategoryReducer from './triviaCategory';
import brandReducer from './brand';
import brandsCategories from './brandsCategories';
import dialogReducer from './dialog';
import adminReducer from './admin';
import inviteCodeReducer from './inviteCode';
import adminNotesReducer from './adminNotes';
import couponReducer from './coupon';
import questionReducer from './question';
import minigameReducer from './minigame';
import linkReducer from './externalLink';
import walletReducer from './wallet';
import initialPhaseReducer from './phase';
import scratchOffReducer from './scratchOff';
import locationReducer from './location';
import prizeReducer from './prize';
import zipcodeReducer from './zipcode';
import challengeReducer from './challenge';
import challengeTypeReducer from './challengeType';
import mileReducer from './mile';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  couponReducer,
  snackbarReducer,
  dialogReducer,
  userReducer,
  playerReducer,
  categoryReducer,
  triviaCategoryReducer,
  brandReducer,
  brandsCategories,
  adminReducer,
  inviteCodeReducer,
  adminNotesReducer,
  questionReducer,
  minigameReducer,
  linkReducer,
  walletReducer,
  initialPhaseReducer,
  scratchOffReducer,
  locationReducer,
  prizeReducer,
  zipcodeReducer,
  challengeReducer,
  challengeTypeReducer,
  mileReducer,
  form: formReducer,
});

export default rootReducer;
