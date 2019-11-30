import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';

export const MyCourse = {

  getCourseList(id) {
    return AXIOS.get(`${URL.SCHOOL_PERIOD}/subjectsTaught?teacher_id=${id}`, {
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

  getEnrolledStudents(idTeacher,idComplex) {
    return AXIOS.get(`${URL.TEACHER_INSCRIPTION}/enrolledStudent?teacher_id=${idTeacher}&school_period_subject_teacher_id=${idComplex}`, {
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

  updateQualifications(payload) {
    return AXIOS.post(`${URL.TEACHER_INSCRIPTION}/loadNotes`, payload, {
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



export default MyCourse;
