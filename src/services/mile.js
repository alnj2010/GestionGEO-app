import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';

export const Mile = {
  getList() {
    return AXIOS.get(`${URL.MILE}`, {
      headers: headers(),
    })
      .then(response => {
        return response.data;
      })
      .catch(({ error: { response: { data } } }) => {
        if (data) return Promise.reject(data.message);
        return Promise.reject('Unknow error');
      });
  }
}