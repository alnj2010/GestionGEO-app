import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';
import { getSessionUser } from '../storage/sessionStorage';
import { handleErrorMsg, handleResponseService } from '../helpers';

export const MiPerfil = {
  findMiPerfil() {
    return getSessionUser();
  },
  update(perfil) {
    return AXIOS.post(`/updateUser`, perfil, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  changePassword(data) {
    return AXIOS.post(`${URL.CHANGE_PASSWORD}`, data, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
};

export default MiPerfil;
