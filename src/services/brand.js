import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';

export const Brand = {
  getList() {
    return AXIOS.get(`${URL.BRAND}`, {
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
  getFullList() {
    return AXIOS.get(`${URL.BRAND}/all`, {
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
  findById(id) {
    return AXIOS.get(`${URL.BRAND}/${id}`, { headers: headers() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Unknow error');
      });
  },
  save(brand) {
    return AXIOS.post(`${URL.BRAND}`, brand, {
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
    return AXIOS.delete(`${URL.BRAND}/${id}`, { headers: headers() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Unknow error');
      });
  },
  update(brand) {
    return AXIOS.patch(`${URL.BRAND}/${brand.id}`, brand, {
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
  uploadPhoto(photo, id) {
    const formData = new FormData();
    formData.append('photo', photo);
    return AXIOS.put(`${URL.BRAND}/upload/${id}`, formData, {
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

  getRandom(birthday, gender) {
    return AXIOS.get(
      `${URL.BRAND}/random?birthday=${birthday}&gender=${gender}`,
      {
        headers: headers(),
      },
    )
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

export default Brand;
