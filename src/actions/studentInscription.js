import { StudentInscription } from '../services/studentInscription';
import { show } from './snackbar';

export const ACTIONS = {
  AVAILABLE_SUBJECTS: 'studentInscription/available-subjects',
  CURRENT_ENROLLED_SUBJECTS: 'studentInscription/current-enrolled-subjects',
  CLEAN_AVAILABLE_SUBJECTS: `studentInscription/clean-available-subjects`,
};

export const getCurrentEnrolledSubjects = (id) => async (dispatch) => {
  return StudentInscription.getCurrentEnrolledSubjects(id)
    .then((response) => {
      dispatch({
        type: ACTIONS.CURRENT_ENROLLED_SUBJECTS,
        payload: { currentEnrolledSubjects: response },
      });
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const getAvailableSubjects = (id) => async (dispatch) => {
  return StudentInscription.getAvailableSubjects(id)
    .then((response) => {
      dispatch({
        type: ACTIONS.AVAILABLE_SUBJECTS,
        payload: { availableSubjects: response },
      });
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const inscription = (value) => async (dispatch) => {
  if (value.subjects.length) {
    return StudentInscription.inscription(value)
      .then((response) => {
        show('Inscripcion realizada sastifactoriamente', 'success')(dispatch);
        return response;
      })
      .catch((error) => {
        show(error.message, 'error')(dispatch);
        return false;
      });
  }
  show('Ud no inscribio ninguna materia', 'error')(dispatch);
  return false;
};

export const cleanAvailableSubjects = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.CLEAN_AVAILABLE_SUBJECTS,
    payload: { availableSubjects: {} },
  });
};
