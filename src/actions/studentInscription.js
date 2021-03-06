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
      throw error;
    });
};
export const cleanGetCurrentEnrolledSubjects = (id) => async (dispatch) => {
  dispatch({
    type: ACTIONS.CURRENT_ENROLLED_SUBJECTS,
    payload: { currentEnrolledSubjects: [] },
  });
  return true;
};
export const withdrawSubjects = (id, studentId) => async (dispatch) => {
  const payload = {
    student_id: studentId,
    withdraw_subjects: [
      {
        student_subject_id: id,
      },
    ],
  };
  return StudentInscription.withdrawSubjects(payload)
    .then((response) => {
      show('Retiro sastifactorio', 'success')(dispatch);
      return response;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};

export const getAvailableSubjects = (id) => async (dispatch) => {
  return StudentInscription.getAvailableSubjects(id)
    .then((response) => {
      dispatch({
        type: ACTIONS.AVAILABLE_SUBJECTS,
        payload: {
          availableSubjects: response.available_subjects,
          finalWorkSubjects: response.final_work_subjects || response.project_subjects,
          approvedProjects: response.approved_projects || [],
          message: null,
        },
      });
      return true;
    })
    .catch((error) => {
      dispatch({
        type: ACTIONS.AVAILABLE_SUBJECTS,
        payload: {
          availableSubjects: [],
          finalWorkSubjects: [],
          approvedProjects: [],
          message: error.message,
        },
      });
      throw error;
    });
};

export const inscription = (value) => async (dispatch) => {
  return StudentInscription.inscription(value)
    .then((response) => {
      show('Inscripcion realizada sastifactoriamente', 'success')(dispatch);
      return response;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};

export const cleanAvailableSubjects = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.CLEAN_AVAILABLE_SUBJECTS,
    payload: { availableSubjects: [], finalWorkSubjects: [], approvedProjects: [], message: null },
  });
};
