import { Mile } from '../services/mile';
import { show } from './snackbar';

export const ACTIONS = {
  LIST: 'mile/list',
};

export const getList = () => async dispatch => {
  return Mile.getList()
    .then(response => {
      dispatch({ type: ACTIONS.LIST, payload: response });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};
