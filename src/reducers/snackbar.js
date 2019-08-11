import { ACTIONS } from '../actions/snackbar';

const initialState = {
  show: false,
  message: '',
  variant: 'error',
};

const snackbarReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SHOW:
      return { ...state, ...action.payload };
    case ACTIONS.HIDE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default snackbarReducer;
