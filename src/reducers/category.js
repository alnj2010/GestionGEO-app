import { ACTIONS } from '../actions/category';

const initialState = {
  list: [],
  selectedCategory: {},
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, list: [...action.payload] };
    case ACTIONS.SELECT:
      return { ...state, selectedCategory: { ...action.payload } };
    case ACTIONS.CLEAN_SELECTED_CATEGORY:
      return { ...state, selectedCategory: {} };
    default:
      return state;
  }
};

export default categoryReducer;
