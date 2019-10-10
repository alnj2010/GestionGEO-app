import { ACTIONS } from '../actions/student';

const initialState = {
  list: [],
  selectedStudent: {student:{}},
  availableSubjects: [],
  inscribedSchoolPeriods:[]
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_STUDENT:
      return { ...state, selectedStudent: {} };
      
    case ACTIONS.AVAILABLE_SUBJECTS:
      return { ...state, ...action.payload };
    
    case ACTIONS.INSCRIBED_SCHOOL_PERIODS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default studentReducer;
