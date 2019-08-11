import { ACTIONS } from '../actions/adminNotes';

const initialState = {
  value: '',
};

const adminNotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CHANGE:
      return { ...state, ...action.payload };
    case ACTIONS.CLEAN:
      return { ...state, value: '' };
    default:
      return state;
  }
};

export default adminNotesReducer;
