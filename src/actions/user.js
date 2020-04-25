import { User } from '../services/user';
import { show } from './snackbar';
import {
  setSessionUser,
  setSessionGeoToken,
  setSessionUserRol,
  setSessionUserId,
  setSessionStudentId,
  setSessionTeacherId,
  setSessionIsMainUser,
} from '../storage/sessionStorage';

export const ACTIONS = {
  LOGIN: 'user/login',
};

export const login = ({ identification, password, userType }) => async (dispatch) => {
  return User.login({ identification, password, user_type: userType })
    .then((response) => {
      setSessionUser(response.user);
      setSessionGeoToken(response.token);
      setSessionUserRol(response.user.user_type);
      setSessionUserId(response.user.id);
      if (response.user.user_type === 'S') setSessionStudentId(response.user.student.id);

      if (response.user.user_type === 'T') setSessionTeacherId(response.user.teacher.id);

      if (response.user.user_type === 'A')
        setSessionIsMainUser(!!response.user.administrator.principal);

      dispatch({ type: ACTIONS.LOGIN, payload: { logged: true } });
      return true;
    })
    .catch((error) => {
      show(error.message, 'error')(dispatch);
      return false;
    });
};
