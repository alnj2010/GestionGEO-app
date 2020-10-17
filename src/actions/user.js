import { User } from '../services/user';
import { show } from './snackbar';
import {
  setSessionUser,
  setSessionGeoToken,
  setSessionUserRol,
  setSessionUserId,
  setSessionTeacherId,
  setSessionIsMainUser,
} from '../storage/sessionStorage';

export const ACTIONS = {
  LOGIN: 'user/login',
};

export const login = ({ identification, password, userType }) => async (dispatch) => {
  return User.login({ identification, password, user_type: userType })
    .then((response) => {
      setSessionGeoToken(response.token);
      setSessionUser(response.user);
      setSessionUserRol(response.user.user_type);
      setSessionUserId(response.user.id);
      if (response.user.user_type === 'S') {
        return response.user.student;
      }

      if (response.user.user_type === 'T') setSessionTeacherId(response.user.teacher.id);

      if (response.user.user_type === 'A')
        setSessionIsMainUser(!!response.user.administrator.principal);

      dispatch({ type: ACTIONS.LOGIN, payload: { logged: true } });
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const requestResetPassword = (data) => async (dispatch) => {
  const payload = {
    email: data.email,
    user_type: data.userType,
  };
  return User.requestResetPassword(payload)
    .then(() => {
      show('Enlace enviado a su correo', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const resetPassword = (data) => async (dispatch) => {
  const payload = {
    email: data.email,
    user_type: data.userType,
    password: data.password,
    password_confirmation: data.passwordConfirmation,
    token: data.token,
  };
  return User.resetPassword(payload)
    .then(() => {
      show('Contraseña cambiada sastifactoriamente', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};
