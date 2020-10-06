import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';
import { handleErrorMsg, handleResponseService } from '../helpers';

export const MyCourse = {
  getCourseList(id) {
    return AXIOS.get(`${URL.SCHOOL_PERIOD}/subjectsTaught?teacher_id=${id}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  getEnrolledStudents(idTeacher, idComplex) {
    return AXIOS.get(
      `${URL.TEACHER_INSCRIPTION}/enrolledStudent?teacher_id=${idTeacher}&school_period_subject_teacher_id=${idComplex}`,
      {
        headers: headers(),
      }
    )
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  updateQualifications(payload) {
    return AXIOS.post(`${URL.TEACHER_INSCRIPTION}/loadNotes`, payload, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
};

export default MyCourse;
