import { ACTIONS } from '../actions/brand';

const initialState = {
  list: [],
  selectedBrand: {},
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, list: [...action.payload] };
    case ACTIONS.SELECT:
      return { ...state, selectedBrand: { ...action.payload } };
    case ACTIONS.CLEAN_SELECTED_BRAND:
      return { ...state, selectedBrand: {} };
    default:
      return state;
  }
};

export default brandReducer;
