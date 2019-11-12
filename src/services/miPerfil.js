import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';

export const MiPerfil = {

  findMiPerfil() {
      return JSON.parse(sessionStorage.getItem('user'));
  },
  update(student) {
    return AXIOS.put(`${URL.STUDENT}/${student.id}`, student, {
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

};

export default MiPerfil;
