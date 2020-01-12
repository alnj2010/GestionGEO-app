import { MyCourse } from '../services/myCourse';
import { show } from './snackbar';

export const ACTIONS = {
    LIST:`myCourse/list`,
    ENROLLED_STUDENTS:`myCourse/enrolled-students`,
    CLEAN_SELECTED_COURSE:`myCourse/clean-selected-course`,
};

export const getCoursesList = () => async dispatch => {
    return MyCourse.getCourseList(sessionStorage.getItem('teacherId'))
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: { list: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};
export const getEnrolledStudents = (id) => async dispatch => {
    return MyCourse.getEnrolledStudents(sessionStorage.getItem('teacherId'),id)
    .then(response => {
      dispatch({ type: ACTIONS.ENROLLED_STUDENTS, payload: { enrolledStudents: response } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};

export const cleanEnrolledStudents = id => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN_SELECTED_COURSE,
    payload:  { enrolledStudents: [] },
  });
};

export const updateQualifications = payload => async dispatch => {

    return MyCourse.updateQualifications(payload)
      .then(response => {
        show('nota actualizada', 'success')(dispatch);
        return true;
      })
      .catch(error => {
        show(error, 'error')(dispatch);
        return false;
      });
  };
