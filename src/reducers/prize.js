import { ACTIONS } from '../actions/prize';

const initialState = {
  list: [],
  selectedPrize: {},
};

const prizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_PRIZE:
      return { ...state, selectedPrize: {} };
    default:
      return state;
  }
};

export default prizeReducer;
