import { combineReducers } from 'redux';
import snackbarReducer from './snackbar';
import dialogReducer from './dialog';
import adminReducer from './admin';
import postgraduateReducer from './postgraduate';
import subjectReducer from './subject';
import studentReducer from './student';

import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  snackbarReducer,
  dialogReducer,
  adminReducer,
  studentReducer,
  subjectReducer, 
  postgraduateReducer,
  form: formReducer,
});

export default rootReducer;
