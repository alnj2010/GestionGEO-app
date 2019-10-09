import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';

export const SchoolPeriod = {

  getSchoolPeriodList() {
    return AXIOS.get(`${URL.SCHOOL_PERIOD}`, {
      headers: headers(),
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  findSchoolPeriodById(id) {
    return AXIOS.get(`${URL.SCHOOL_PERIOD}/${id}`, {
      headers: headers(),
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  findCurrentSchoolPeriod() {
    return AXIOS.get(`${URL.SCHOOL_PERIOD}/current`, {
      headers: headers(),
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  update(shoolPeriod) {
    return AXIOS.put(`${URL.SCHOOL_PERIOD}/${shoolPeriod.id}`, shoolPeriod, {
      headers: headers(),
    })
      .then(response => {
        if(response.status===200) return response.data;
        return Promise.reject(new Error('fail'))
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },

  saveSchoolPeriod(shoolPeriod) {
    return AXIOS.post(`${URL.SCHOOL_PERIOD}`, shoolPeriod, {
      headers: headers(),
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  delete(shoolPeriodId) {
    return AXIOS.delete(`${URL.SCHOOL_PERIOD}/${shoolPeriodId}`, {
      headers: headers(),
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
};

export default SchoolPeriod;
