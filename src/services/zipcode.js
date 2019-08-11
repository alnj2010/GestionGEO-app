import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';

export const Zipcode = {
  getList() {
    return AXIOS.get(`${URL.ZIPCODE}?join=location`, {
      headers: headers(),
    })
      .then(response => {
        return response.data.filter( item => !item.deleteAt);;
      })
      .catch(({ error: { response: { data } } }) => {
        if (data) return Promise.reject(data.message);
        return Promise.reject('Unknow error');
      });
  },
  findById(id) {
    return AXIOS.get(`${URL.ZIPCODE}/${id}?join=location`, {
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
  save(zipcode) {
    return AXIOS.post(`${URL.ZIPCODE}`, zipcode, {
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
  update(zipcode) {
    return AXIOS.patch(`${URL.ZIPCODE}/${zipcode.id}`, zipcode, {
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
    return AXIOS.delete(`${URL.ZIPCODE}/${id}`, { headers: headers() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Unknow error');
      });
  },

}