import * as moment from 'moment';
import { User } from '../services/user';
import { show } from './snackbar';
import {
  setSessionUser,
  setSessionGeoToken,
  setSessionUserRol,
  setSessionUserId,
  setSessionTeacherId,
  setSessionIsMainUser,
  setTokenExpires,
  setInitTimeLogin,
  getSessionUser,
  setSessionStudentId,
} from '../storage/sessionStorage';

export const ACTIONS = {
  LOGIN: 'user/login',
};

export const login = ({ identification, password }) => async (dispatch) => {
  return User.login({ identification, password })
    .then((response) => {
      setSessionGeoToken(response.token);
      setTokenExpires(response.expires);
      setInitTimeLogin(moment().unix());
      setSessionUser(response.user);
      setSessionUserId(response.user.id);
      dispatch({ type: ACTIONS.LOGIN, payload: { logged: true } });
      if (response.user.roles.length === 1) {
        const [{ user_type: userType }] = response.user.roles;
        setSessionUserRol(userType);

        if (userType === 'S') {
          if (response.user.student.length !== 1) {
            return response.user.student;
          }
          const [student] = response.user.student;
          const user = getSessionUser();
          user.student = student;
          setSessionUser(user);
          setSessionStudentId(student.id);
        }

        if (userType === 'T') setSessionTeacherId(response.user.teacher.id);

        if (userType === 'A') setSessionIsMainUser(!!response.user.administrator.principal);

        return userType;
      }
      return response.user;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};

export const requestResetPassword = (data) => async (dispatch) => {
  const payload = {
    email: data.email,
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
    password: data.password,
    password_confirmation: data.passwordConfirmation,
    token: data.token,
  };
  return User.resetPassword(payload)
    .then(() => {
      show('Contraseña cambiada satisfactoriamente', 'success')(dispatch);
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      throw error;
    });
};
