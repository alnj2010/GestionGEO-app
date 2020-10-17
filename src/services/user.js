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

  getAdminList() {
    return AXIOS.get(`${URL.ADMIN}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  findAdminById(id) {
    return AXIOS.get(`${URL.ADMIN}/${id}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  saveAdmin(admin) {
    return AXIOS.post(`${URL.ADMIN}`, admin, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  delete(adminId) {
    return AXIOS.delete(`${URL.ADMIN}/${adminId}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  update(player) {
    return AXIOS.put(`${URL.ADMIN}/${player.id}`, player, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
};

export default User;
