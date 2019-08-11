export const ACTIONS = {
  CHANGE: 'adminNotes/change',
  CLEAN: `adminNotes/clean`,
};

export const changeNotes = notes => async dispatch => {
  dispatch({ type: ACTIONS.CHANGE, payload: { value: notes } });
};

export const cleanNotes = () => async dispatch => {
  dispatch({ type: ACTIONS.CLEAN });
};
