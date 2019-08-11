import { ACTIONS } from '../actions/minigame';

const initialState = {
  list: [],
  categoryList: [],
  selectedTrivia: {},
};

const minigameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, list: action.payload.map(res => res) };
    case ACTIONS.LIST_CATEGORY:
      return { ...state, categoryList: action.payload.map(res => res) };
    case ACTIONS.SELECT_TRIVIA:
      return { ...state, selectedTrivia: { ...action.payload } };
    case ACTIONS.CLEAN_SELECTED_TRIVIA:
      return { ...state, selectedTrivia: {} };
    default:
      return state;
  }
};

export default minigameReducer;
