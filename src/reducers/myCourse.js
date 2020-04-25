import { ACTIONS } from '../actions/myCourse';

const initialState = {
  list: [],
  enrolledStudents: [],
};

const myCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.ENROLLED_STUDENTS:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_COURSE:
      return { ...state, enrolledStudents: [] };
    default:
      return state;
  }
};

export default myCourseReducer;
