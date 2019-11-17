import { combineReducers } from 'redux';
import snackbarReducer from './snackbar';
import dialogReducer from './dialog';
import adminReducer from './admin';
import schoolProgramReducer from './schoolProgram';
import subjectReducer from './subject';
import studentReducer from './student';
import teacherReducer from './teacher';
import miPerfilReducer from './miPerfil';
import schoolPeriodReducer from './schoolPeriod';
import studentInscriptionReducer from './studentInscription';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  snackbarReducer,
  dialogReducer,
  adminReducer,
  teacherReducer,
  studentReducer,
  subjectReducer, 
  schoolProgramReducer,
  schoolPeriodReducer,
  miPerfilReducer,
  studentInscriptionReducer,
  form: formReducer,  
});

export default rootReducer;
