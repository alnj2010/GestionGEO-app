export const ACTIONS = {
  SHOW: 'dialog/show',
  DEFINE: 'dialog/define',
  HIDE: 'dialog/hide',
  CLEAN: 'dialog/clean',
};

export const show = action => async dispatch => {
  dispatch({
    type: ACTIONS.SHOW,
    payload: { open: true, action: action },
  });
};

export const define = entity => async dispatch => {
  dispatch({
    type: ACTIONS.DEFINE,
    payload: { entity: entity },
  });
};

export const hide = () => async dispatch => {
  dispatch({ type: ACTIONS.HIDE, payload: { open: false } });
};

export const cleanDialog = () => async dispatch => {
  dispatch({
    type: ACTIONS.CLEAN,
    payload: { open: false, action: '', entity: '' },
  });
};
