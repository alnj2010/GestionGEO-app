import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';
import { handleErrorMsg, handleResponseService } from '../helpers';

export const SchoolProgram = {
  getSchoolProgramList() {
    return AXIOS.get(`${URL.SCHOOL_PROGRAM}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  findSchoolProgramById(id) {
    return AXIOS.get(`${URL.SCHOOL_PROGRAM}/${id}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  update(schoolProgram) {
    return AXIOS.put(`${URL.SCHOOL_PROGRAM}/${schoolProgram.id}`, schoolProgram, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  saveSchoolProgram(schoolProgram) {
    return AXIOS.post(`${URL.SCHOOL_PROGRAM}`, schoolProgram, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  delete(schoolProgramId) {
    return AXIOS.delete(`${URL.SCHOOL_PROGRAM}/${schoolProgramId}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
};

export default SchoolProgram;
