import { ACTIONS } from '../actions/schoolProgram';

const initialState = {
  list: [],
  selectedSchoolProgram: {},
};

const schoolProgramReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_SCHOOL_PROGRAM:
      return { ...state, selectedSchoolProgram: {} };
    default:
      return state;
  }
};

export default schoolProgramReducer;
