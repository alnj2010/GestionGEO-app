import { User } from '../services/user';
import { show } from './snackbar';

export const ACTIONS = {
  LOGIN: 'user/login',
};

export const login = ({ identification, password, user_type }) => async dispatch => {
  return User.login({ identification, password, user_type })
    .then(response => {
      sessionStorage.setItem('GeoToken', response.token);
      sessionStorage.setItem('rol', response.user.user_type);
      sessionStorage.setItem('main', !!response.user.administrator.principal);
      dispatch({ type: ACTIONS.LOGIN, payload: { logged: true } });
      return true;
    })
    .catch(error => {
      show(error, 'error')(dispatch);
      return false;
    });
};
