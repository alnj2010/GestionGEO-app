import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';
import { handleErrorMsg, handleResponseService } from '../helpers';

export const User = {
  login(formData) {
    return AXIOS.post(`${URL.AUTH}`, formData, { headers: headers() })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  getList() {
    return AXIOS.get(`${URL.ADMIN}?join=profile`, { headers: headers() })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  getWinnersList() {
    return AXIOS.get(`${URL.ADMIN}/leaderboard`, {
      headers: headers(),
    })
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
  findById(id) {
    return AXIOS.get(`${URL.ADMIN}?filter=id||eq||${id}&join=profile`, {
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
  update(player) {
    return AXIOS.put(`${URL.ADMIN}/${player.id}`, player, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  save(player) {
    return AXIOS.post(`${URL.ADMIN}`, player, {
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
  uploadPhoto(photo, id) {
    const formData = new FormData();
    formData.append('photo', photo);
    return AXIOS.put(`${URL.ADMIN}/upload/${id}`, formData, {
      headers: headers('form'),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
};

export default User;
