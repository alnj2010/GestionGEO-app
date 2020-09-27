import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';
import { handleErrorMsg, handleResponseService } from '../helpers';

export const Subject = {
  getSubjectList() {
    return AXIOS.get(`${URL.SUBJECT}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  getSubjectBySchoolProgram(idSchoolProgram) {
    return AXIOS.get(`${URL.SUBJECTBYSCHOOLPROGRAM}/${idSchoolProgram}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  findSubjectById(id) {
    return AXIOS.get(`${URL.SUBJECT}/${id}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  update(subject) {
    return AXIOS.put(`${URL.SUBJECT}/${subject.id}`, subject, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  saveSubject(subject) {
    return AXIOS.post(`${URL.SUBJECT}`, subject, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  delete(subjectId) {
    return AXIOS.delete(`${URL.SUBJECT}/${subjectId}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
};

export default Subject;
