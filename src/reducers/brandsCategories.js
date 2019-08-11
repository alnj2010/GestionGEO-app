import { ACTIONS } from '../actions/brandsCategories.js';

const initialState = {
  list: [],
  selectedBrand: {},
};

const brandsCategoriesReducer = (state = initialState, action) => {
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

export default brandsCategoriesReducer;
