import { ACTIONS } from '../actions/externalLinks';

const initialState = {
  list: [],
  selectedLink: {},
};

const linkReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, list: [...action.payload] };
    case ACTIONS.SELECT:
      return { ...state, selectedLink: { ...action.payload } };
    case ACTIONS.CLEAN_SELECTED_LINK:
      return { ...state, selectedLink: {} };
    default:
      return state;
  }
};

export default linkReducer;
