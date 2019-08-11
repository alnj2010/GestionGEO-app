import { ACTIONS } from '../actions/triviaCategory';

const initialState = {
  list: [],
  selectedTriviaCategory: {},
};

const triviaCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, list: [...action.payload] };
    case ACTIONS.SELECT:
      return { ...state, selectedTriviaCategory: { ...action.payload } };
    case ACTIONS.CLEAN_SELECTED_TRIVIA_CATEGORY:
      return { ...state, selectedTriviaCategory: {} };
    default:
      return state;
  }
};

export default triviaCategoryReducer;
