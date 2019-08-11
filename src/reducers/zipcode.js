import { ACTIONS } from '../actions/zipcode';

const initialState = {
  list: [],
  selectedZipcode: {},
};

const zipcodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_ZIPCODE:
      return { ...state, selectedZipcode: {} };
    default:
      return state;
  }
};

export default zipcodeReducer;
