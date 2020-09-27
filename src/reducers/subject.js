import { ACTIONS } from '../actions/subject';

const initialState = {
  list: [],
  listBySchoolPeriod: [],
  selectedSubject: {},
};

const subjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.LISTBYSCHOOLPROGRAM:
      return { ...state, ...action.payload };
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_SUBJECT:
      return { ...state, selectedSubject: {} };
    default:
      return state;
  }
};

export default subjectReducer;
