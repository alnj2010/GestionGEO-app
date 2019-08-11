import { ACTIONS } from '../actions/admin';

const initialState = {
  list: [],
  selectedAdmin: {},
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_ADMIN:
      return { ...state, selectedAdmin: {} };
    default:
      return state;
  }
};

export default adminReducer;
