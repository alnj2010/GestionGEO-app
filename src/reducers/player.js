import { ACTIONS } from '../actions/player';

const initialState = {
  list: [],
  selectedPlayer: {},
  winners: {},
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.LIST_WINNERS:
      return { ...state, ...action.payload };
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_PLAYER:
      return { ...state, selectedPlayer: {} };
    default:
      return state;
  }
};

export default playerReducer;
