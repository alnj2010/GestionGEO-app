import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';
import { handleErrorMsg, handleResponseService } from '../helpers';

export const StudentInscription = {
  getCurrentEnrolledSubjects(id) {
    return AXIOS.get(`${URL.STUDENT_INSCRIPTION}/currentEnrolledSubjects?student_id=${id}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  getAvailableSubjects(id) {
    return AXIOS.get(`${URL.STUDENT_INSCRIPTION}/availableSubjects?student_id=${id}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  withdrawSubjects(value) {
    return AXIOS.post(`${URL.STUDENT_INSCRIPTION}/withdrawSubjects`, value, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  inscription(value) {
    return AXIOS.post(`${URL.STUDENT_INSCRIPTION}`, value, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
};

export default StudentInscription;
