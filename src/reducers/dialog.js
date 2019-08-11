import { ACTIONS } from '../actions/dialog';

const initialState = {
  open: false,
  action: '',
  entity: '',
};

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.DEFINE:
      return { ...state, ...action.payload };
    case ACTIONS.SHOW:
      return { ...state, ...action.payload };
    case ACTIONS.HIDE:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default dialogReducer;
