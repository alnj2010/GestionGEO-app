import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';
import { handleErrorMsg, handleResponseService } from '../helpers';

export const User = {
  login(formData) {
    return AXIOS.post(`${URL.AUTH}`, formData, { headers: headers() })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  requestResetPassword(formData) {
    return AXIOS.post(`${URL.PASSWORD_EMAIL}`, formData, { headers: headers() })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  resetPassword(formData) {
    return AXIOS.post(`${URL.PASSWORD_RESET}`, formData, { headers: headers() })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
};

export default User;
