import { ACTIONS } from '../actions/student';

const initialState = {
  list: [],
  selectedStudent: {student:{}},
  subjectsInscription: [],
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_STUDENT:
      return { ...state, selectedStudent: {} };

      
    case ACTIONS.SUBJECTS_INSCRIPTION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default studentReducer;
