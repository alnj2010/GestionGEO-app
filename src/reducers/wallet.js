import { ACTIONS } from '../actions/wallet';

const initialState = {
  list: [],
  selectedWallet: {},
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, list: [...action.payload] };
    case ACTIONS.SELECT:
      return { ...state, selectedWallet: { ...action.payload } };
    case ACTIONS.CLEAN_SELECTED_PACKAGE:
      return { ...state, selectedWallet: {} };
    default:
      return state;
  }
};

export default walletReducer;
