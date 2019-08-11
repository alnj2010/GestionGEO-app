import { ACTIONS } from '../actions/mile';

const initialState = {
  list: [],
};

const mileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, list:[...action.payload] };
    default:
      return state;
  }
};

export default mileReducer;
