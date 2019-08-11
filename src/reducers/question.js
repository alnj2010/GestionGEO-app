import { ACTIONS } from '../actions/question';

const initialState = {
  list: [],
  selectedQuestion: {},
};

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, list: [...action.payload] };
    case ACTIONS.SELECT:
      return { ...state, selectedQuestion: { ...action.payload } };
    case ACTIONS.CLEAN_SELECTED_QUESTION:
      return { ...state, selectedQuestion: {} };
    default:
      return state;
  }
};

export default questionReducer;
