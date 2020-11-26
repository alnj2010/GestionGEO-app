import { MyCourse } from '../services/myCourse';
import { show } from './snackbar';
import { getSessionTeacherId } from '../storage/sessionStorage';

export const ACTIONS = {
  LIST: `myCourse/list`,
  ENROLLED_STUDENTS: `myCourse/enrolled-students`,
  CLEAN_SELECTED_COURSE: `myCourse/clean-selected-course`,
};

export const getCoursesList = () => async (dispatch) => {
  return MyCourse.getCourseList(getSessionTeacherId())
    .then((response) => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch((error) => {
      dispatch({ type: ACTIONS.LIST, payload: { list: error } });
      show(error.message, 'error')(dispatch);
      return error.message;
    });
};

export const cleanGetCoursesList = () => async (dispatch) => {
  dispatch({ type: ACTIONS.LIST, payload: { list: [] } });
};
export const getEnrolledStudents = (id) => async (dispatch) => {
  return MyCourse.getEnrolledStudents(getSessionTeacherId(), id)
    .then((response) => {
      dispatch({
        type: ACTIONS.ENROLLED_STUDENTS,
        payload: { enrolledStudents: response },
      });
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const cleanEnrolledStudents = () => async (dispatch) => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_COURSE,
    payload: { enrolledStudents: [] },
  });
};

export const updateQualifications = (payload) => async (dispatch) => {
  return MyCourse.updateQualifications(payload)
    .then(() => {
      show('nota actualizada', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};
