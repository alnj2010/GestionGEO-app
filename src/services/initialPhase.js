import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';

export const initialPhase = {
  getList() {
    return AXIOS.get(`${URL.INITIAL_PHASE}?sort=position,ASC`, {
      headers: headers(),
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Unknow error');
      });
  },
  findById(id) {
    return AXIOS.get(`${URL.INITIAL_PHASE}/${id}`, {
      headers: headers(),
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Unknow error');
      });
  },
  save(phase) {
    return AXIOS.post(`${URL.INITIAL_PHASE}`, phase, {
      headers: headers(),
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Unknow error');
      });
  },
  delete(id) {
    return AXIOS.delete(`${URL.INITIAL_PHASE}/${id}`, { headers: headers() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Unknow error');
      });
  },
  update(phase) {
    return AXIOS.patch(`${URL.INITIAL_PHASE}/${phase.id}`, phase, {
      headers: headers(),
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Unknow error');
      });
  },
  uploadAndroidPhoto(photo, id) {
    const formData = new FormData();
    formData.append('photo', photo);
    return AXIOS.put(`${URL.INITIAL_PHASE}/upload/android/${id}`, formData, {
      headers: headers('form'),
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Unknow error');
      });
  },

  uploadiOSPhoto(photo, id) {
    const formData = new FormData();
    formData.append('photo', photo);
    return AXIOS.put(`${URL.INITIAL_PHASE}/upload/iOS/${id}`, formData, {
      headers: headers('form'),
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Unknow error');
      });
  },
};

export default initialPhase;
