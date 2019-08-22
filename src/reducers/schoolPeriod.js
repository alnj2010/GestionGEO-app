import { ACTIONS } from '../actions/schoolPeriod';

const initialState = {
  list: [],
  selectedSchoolPeriod: {},
};

const SchoolPeriodReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_SCHOOL_PERIOD:
      return { ...state, selectedSchoolPeriod: {} };
    default:
      return state;
  }
};

export default SchoolPeriodReducer;
