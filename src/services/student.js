import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';
import { handleErrorMsg, handleResponseService } from '../helpers';

export const Student = {
  getStudentList() {
    return AXIOS.get(`${URL.STUDENT}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  findStudentById(id) {
    return AXIOS.get(`${URL.STUDENT}/${id}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  update(student) {
    return AXIOS.put(`${URL.STUDENT}/${student.id}`, student, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  updateSchoolProgram(student, id) {
    return AXIOS.put(`${URL.STUDENT}/${id}`, student, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  deleteSchoolProgram(userId, studentId) {
    return AXIOS.delete(`${URL.STUDENT}/${userId}?student_id=${studentId}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  saveStudent(student) {
    return AXIOS.post(`${URL.STUDENT}`, student, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  delete(studentId) {
    return AXIOS.delete(`${URL.STUDENT}/${studentId}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  getAvailableSubjects(studentId, schoolPeriodId) {
    return AXIOS.get(
      `${URL.INSCRIPTION}/availableSubjects?student_id=${studentId}&school_period_id=${schoolPeriodId}`,
      {
        headers: headers(),
      }
    )
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  addStudentPeriodSchool(payload) {
    return AXIOS.post(`${URL.INSCRIPTION}`, payload, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  editStudentPeriodSchool(payload) {
    return AXIOS.put(`${URL.INSCRIPTION}/${payload.id}`, payload, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  getInscribedSchoolPeriods(studentId) {
    return AXIOS.get(`${URL.CONSTANCE}/studentHistorical?student_id=${studentId}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
};

export default Student;
