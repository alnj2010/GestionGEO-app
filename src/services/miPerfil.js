import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';
import { getSessionUser } from '../storage/sessionStorage';

export const MiPerfil = {
  findMiPerfil() {
    return getSessionUser();
  },
  update(perfil) {
    return AXIOS.post(`/updateUser`, perfil, {
      headers: headers(),
    })
      .then((response) => {
        if (response.status && response.status !== 200) {
          const error = { response };
          throw error;
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.error);
        return Promise.reject(new Error('Ups! Al parecer hay un error desconocido.'));
      });
  },

  changePassword(data) {
    return AXIOS.post(`${URL.CHANGE_PASSWORD}`, data, {
      headers: headers(),
    })
      .then((response) => {
        if (response.status && response.status !== 200) {
          const error = { response };
          throw error;
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.error);
        return Promise.reject(new Error('Ups! Al parecer hay un error desconocido.'));
      });
  },
};

export default MiPerfil;
