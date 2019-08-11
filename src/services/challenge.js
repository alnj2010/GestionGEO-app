import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';

export const Challenge = {
  getList() {
    return AXIOS.get(`${URL.CHALLENGE}?join=type`, {
      headers: headers(),
    })
      .then(response => {
        return response.data;
      })
      .catch(({ error: { response: { data } } }) => {
        if (data) return Promise.reject(data.message);
        return Promise.reject('Unknow error');
      });
  },
  findById(id) {
    return AXIOS.get(`${URL.CHALLENGE}/${id}?join=type&join=coupons&join=prizes&join=zipcode&join=map_point`, {
      headers: headers(),
    })
      .then(response => {
        response.data.mapPoints=response.data.mapPoints.sort((a,b)=>{
          if(a.order<b.order) return -1;
          if(a.order>b.order) return 1;
          return 0;
        })
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Unknow error');
      });
  },
  save(challenge) {
    
    return AXIOS.post(`${URL.CHALLENGE}`, challenge, {
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
  update(challenge) {
    return AXIOS.patch(`${URL.CHALLENGE}/${challenge.id}`, challenge, {
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
  updateSpecialHint(challenge) {
    return AXIOS.patch(`${URL.CHALLENGE}/send/special-hint`, challenge, {
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
    return AXIOS.delete(`${URL.CHALLENGE}/${id}`, { headers: headers() })
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