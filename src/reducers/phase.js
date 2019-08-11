import { ACTIONS } from '../actions/initialPhase';

const initialState = {
  list: [],
  selectedPhase: {},
};

const phaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_PHASE:
      return { ...state, selectedPhase: {} };
    default:
      return state;
  }
};

export default phaseReducer;
