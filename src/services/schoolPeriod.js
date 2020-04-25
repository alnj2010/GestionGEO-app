import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';
import { handleErrorMsg, handleResponseService } from '../helpers';

export const SchoolPeriod = {
  getSchoolPeriodList() {
    return AXIOS.get(`${URL.SCHOOL_PERIOD}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  findSchoolPeriodById(id) {
    return AXIOS.get(`${URL.SCHOOL_PERIOD}/${id}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  findCurrentSchoolPeriod() {
    return AXIOS.get(`${URL.SCHOOL_PERIOD}/current`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  update(shoolPeriod) {
    return AXIOS.put(`${URL.SCHOOL_PERIOD}/${shoolPeriod.id}`, shoolPeriod, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },

  saveSchoolPeriod(shoolPeriod) {
    return AXIOS.post(`${URL.SCHOOL_PERIOD}`, shoolPeriod, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
  delete(shoolPeriodId) {
    return AXIOS.delete(`${URL.SCHOOL_PERIOD}/${shoolPeriodId}`, {
      headers: headers(),
    })
      .then(handleResponseService)
      .catch(handleErrorMsg);
  },
};

export default SchoolPeriod;
