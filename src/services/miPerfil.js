import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';

export const MiPerfil = {

  findMiPerfil() {
      return JSON.parse(sessionStorage.getItem('user'));
  },
  update(perfil) {
    return AXIOS.post(`/updateUser`, perfil, {
      headers: headers(),
    })
      .then(response => {
        if( response.status && response.status!==200){
          let error={response:response};
          throw error
        };
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },

  changePassword(data){
    return AXIOS.post(`${URL.CHANGE_PASSWORD}`, data, {
      headers: headers(),
    })
      .then(response => {
        if( response.status && response.status!==200){
          let error={response:response};
          throw error
        };
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  }
};

export default MiPerfil;
