import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';

export const Subject = {
  getSubjectList() {
    return AXIOS.get(`${URL.SUBJECT}`, {
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
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  findSubjectById(id) {
    return AXIOS.get(`${URL.SUBJECT}/${id}`, {
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
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  update(subject) {
    return AXIOS.put(`${URL.SUBJECT}/${subject.id}`, subject, {
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
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },

  saveSubject(subject) {
    return AXIOS.post(`${URL.SUBJECT}`, subject, {
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
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  delete(subjectId) {
    return AXIOS.delete(`${URL.SUBJECT}/${subjectId}`, {
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
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
};

export default Subject;
