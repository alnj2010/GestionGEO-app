import { StudentInscription } from '../services/studentInscription';
import { show } from './snackbar';

export const ACTIONS = {
  AVAILABLE_SUBJECTS: 'studentInscription/available-subjects',
  CURRENT_ENROLLED_SUBJECTS: 'studentInscription/current-enrolled-subjects',
};

export const getCurrentEnrolledSubjects = (id) => async dispatch => {
  return StudentInscription.getCurrentEnrolledSubjects(id)
    .then(response => {
      dispatch({ type: ACTIONS.CURRENT_ENROLLED_SUBJECTS, payload: { currentEnrolledSubjects: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};