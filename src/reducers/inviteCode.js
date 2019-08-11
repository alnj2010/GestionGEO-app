import { ACTIONS } from '../actions/inviteCode';

const initialState = {
  setup: {},
  list: [],
  userInvitations: {},
};

const inviteCodeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.GET_SETUP:
      return { ...state, setup: action.payload.setup };
    case ACTIONS.LIST_INVITATIONS:
      return { ...state, list: [...action.payload.list] };
    case ACTIONS.LIST_USER_INVITATIONS:
      return { ...state, userInvitations: action.payload };
    default:
      return state;
  }
};

export default inviteCodeReducer;
