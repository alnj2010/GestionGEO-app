import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';

export const StudentInscription = {

  getCurrentEnrolledSubjects(id) {
    return AXIOS.get(`${URL.STUDENT_INSCRIPTION}/currentEnrolledSubjects?student_id=${id}`, {
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

  getAvailableSubjects(id) {
    return AXIOS.get(`${URL.STUDENT_INSCRIPTION}/availableSubjects?student_id=${id}`, {
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

  inscription(value) {
    return AXIOS.post(`${URL.STUDENT_INSCRIPTION}`,value, 
    {
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

export default StudentInscription;
