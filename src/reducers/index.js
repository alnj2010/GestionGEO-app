import { combineReducers } from 'redux';
import snackbarReducer from './snackbar';
import dialogReducer from './dialog';
import adminReducer from './admin';
import adminNotesReducer from './adminNotes';

import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  snackbarReducer,
  dialogReducer, 
  adminReducer,
  adminNotesReducer,
  form: formReducer,
});

export default rootReducer;
