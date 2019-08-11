import { ACTIONS } from '../actions/location';

const initialState = {
  list: [],
  selectedLocation: {},
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_LOCATION:
      return { ...state, selectedLocation: {} };
    default:
      return state;
  }
};

export default locationReducer;
