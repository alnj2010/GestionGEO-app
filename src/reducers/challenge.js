import { ACTIONS } from '../actions/challenge';

const initialState = {
  list: [],
  selectedChallenge: {
  },
};

const challengeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, list:[...action.payload] };
    case ACTIONS.SELECT:
      return { ...state, selectedChallenge:{...action.payload} };
    case ACTIONS.CLEAN_SELECTED_CHALLENGE:
      return { ...state, selectedChallenge: {} };
    default:
      return state;
  }
};

export default challengeReducer;
