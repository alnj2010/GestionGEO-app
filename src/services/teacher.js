import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';

export const Teacher = {
  getTeacherList() {
    return AXIOS.get(`${URL.TEACHER}`, {
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
  findTeacherById(id) {
    return AXIOS.get(`${URL.TEACHER}/${id}`, {
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
  update(teacher) {
    return AXIOS.put(`${URL.TEACHER}/${teacher.id}`, teacher, {
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

  saveTeacher(teacher) {
    return AXIOS.post(`${URL.TEACHER}`, teacher, {
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
  delete(teacherId) {
    return AXIOS.delete(`${URL.TEACHER}/${teacherId}`, {
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

export default Teacher;
