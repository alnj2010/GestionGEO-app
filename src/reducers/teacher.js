import { ACTIONS } from '../actions/teacher';

const initialState = {
  list: [],
  selectedTeacher: {},
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_TEACHER:
      return { ...state, selectedTeacher: {} };
    default:
      return state;
  }
};

export default teacherReducer;
