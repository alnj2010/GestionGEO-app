import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';

export const Category = {
  getList() {
    return AXIOS.get(`${URL.CATEGORY}`, { headers: headers() })
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
    return AXIOS.get(
      `${
        URL.CATEGORY
      }/${id}?join=categoryBrands&join=categoryBrands.brand&join=categoryBrands.category`,
      {
        headers: headers(),
      },
    )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data) {
          if (error.response.status === 404)
            return AXIOS.get(`${URL.CATEGORY}/${id}?join=categoryBrands`, {
              headers: headers(),
            }).then(response => {
              return response.data;
            });
          return Promise.reject(error.response.data.message);
        }
        return Promise.reject('Unknow error');
      });
  },
  save(category) {
    return AXIOS.post(`${URL.CATEGORY}`, category, {
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
    return AXIOS.delete(`${URL.CATEGORY}/${id}`, { headers: headers() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Unknow error');
      });
  },
  update(category) {
    return AXIOS.patch(`${URL.CATEGORY}/${category.id}`, category, {
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
    return AXIOS.put(`${URL.CATEGORY}/upload/${id}`, formData, {
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

export default Category;
