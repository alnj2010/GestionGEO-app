import { ACTIONS } from '../actions/coupon';

const initialState = {
  list: [],
  selectedCoupon: {},
  
  settingsRC: {},
  listRC: [],
  selectedRC:[]
};

const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, ...action.payload };
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_COUPON:
      return { ...state, selectedCoupon: {} };
    case ACTIONS.GET_SETTINGS:
      return { ...state, settingsRC: action.payload.settingsRC };
    case ACTIONS.LIST_RC:
      return { ...state, listRC: action.payload.listRC };
    case ACTIONS.SELECT_RC:
      return { ...state, selectedRC:action.payload.selectedRC };
    default:
      return state;
  }
};

export default couponReducer;
