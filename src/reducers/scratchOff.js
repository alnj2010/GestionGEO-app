import { ACTIONS } from '../actions/scratchOff';

const initialState = {
  list: [],
  selectedScratchOff: {
    luckyNumbers: {
      numbers: [],
    },
  },
};

const scratchOffReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, list: [...action.payload] };
    case ACTIONS.SELECT:
      return { ...state, selectedScratchOff: { ...action.payload } };
    case ACTIONS.CLEAN_SELECTED_SCRATCH_OFF:
      return { ...state, selectedScratchOff: initialState.selectedScratchOff };
    default:
      return state;
  }
};

export default scratchOffReducer;
