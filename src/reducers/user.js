import { ACTIONS } from '../actions/user';

const initialState = {
  logged: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default userReducer;
