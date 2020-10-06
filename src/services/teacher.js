import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';
import { handleErrorMsg, handleResponseService } from '../helpers';

export const Teacher = {
  getTeacherList() {
    return AXIOS.get(`${URL.TEACHER}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  findTeacherById(id) {
    return AXIOS.get(`${URL.TEACHER}/${id}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  update(teacher) {
    return AXIOS.put(`${URL.TEACHER}/${teacher.id}`, teacher, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  saveTeacher(teacher) {
    return AXIOS.post(`${URL.TEACHER}`, teacher, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  delete(teacherId) {
    return AXIOS.delete(`${URL.TEACHER}/${teacherId}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
};

export default Teacher;
