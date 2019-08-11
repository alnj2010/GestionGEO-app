import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';

export const ChallengeType = {
  getList() {
    return AXIOS.get(`${URL.CHALLENGE_TYPE}`, {
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
    return AXIOS.get(`${URL.CHALLENGE_TYPE}/${id}`, {
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
}