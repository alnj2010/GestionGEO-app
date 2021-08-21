import { ACTIONS } from '../actions/userToConvert';

const initialState = {
  selectedUserToConvert: {},
};

const userToConvertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SELECT:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN_SELECTED_USER_TO_CONVERT:
      return { ...state, selectedUserToConvert: {} };
    default:
      return state;
  }
};

export default userToConvertReducer;
