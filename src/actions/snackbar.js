export const ACTIONS = {
  SHOW: 'snackbar/show',
  HIDE: 'snackbar/hide',
};

export const show = (message, variant) => async dispatch => {
  dispatch({
    type: ACTIONS.SHOW,
    payload: { show: true, message: message, variant: variant },
  });
};

export const hide = () => async dispatch => {
  dispatch({ type: ACTIONS.HIDE, payload: { show: false, message: '' } });
};
