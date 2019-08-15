import { ACTIONS } from '../actions/postgraduate';

const initialState = {
  list: [],
  selectedPostgraduate: {},
};

const postgraduateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_POSTGRADUATE:
      return { ...state, selectedPostgraduate: {} };
    default:
      return state;
  }
};

export default postgraduateReducer;
