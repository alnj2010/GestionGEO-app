import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import snackbarReducer from './snackbar';
import dialogReducer from './dialog';
import adminReducer from './admin';
import schoolProgramReducer from './schoolProgram';
import subjectReducer from './subject';
import studentReducer from './student';
import teacherReducer from './teacher';
import miPerfilReducer from './miPerfil';
import myCourseReducer from './myCourse';
import schoolPeriodReducer from './schoolPeriod';
import studentInscriptionReducer from './studentInscription';
import userToConvertReducer from './userToConvert';

const rootReducer = combineReducers({
  snackbarReducer,
  dialogReducer,
  adminReducer,
  teacherReducer,
  studentReducer,
  subjectReducer,
  myCourseReducer,
  schoolProgramReducer,
  schoolPeriodReducer,
  miPerfilReducer,
  studentInscriptionReducer,
  userToConvertReducer,
  form: formReducer,
});

export default rootReducer;
