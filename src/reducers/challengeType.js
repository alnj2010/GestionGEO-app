import { ACTIONS } from '../actions/challengeType';

const initialState = {
  list: [],
  selectedPrize: {},
};

const challengeTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default challengeTypeReducer;
