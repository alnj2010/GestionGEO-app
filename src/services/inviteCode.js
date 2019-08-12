import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';
import Axios from 'axios';

export const InviteCode = {
  updateSetup(setup) {
    return Axios.all([
      AXIOS.patch(`${URL.MASTER}`, setup[0], { headers: headers() }),
      AXIOS.patch(`${URL.MASTER}`, setup[1], { headers: headers() }),
      AXIOS.patch(`${URL.MASTER}`, setup[2], { headers: headers() }),
      AXIOS.patch(`${URL.MASTER}`, setup[3], { headers: headers() }),
      AXIOS.patch(`${URL.MASTER}`, setup[4], { headers: headers() }),
      AXIOS.patch(`${URL.MASTER}`, setup[5], { headers: headers() }),
      AXIOS.patch(`${URL.MASTER}`, setup[6], { headers: headers() }),
    ])
      .then(response => {
        return response;
      })
      .catch(error => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  getSetup() {
    return AXIOS.get(`${URL.MASTER}/setup`, { headers: headers() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  getList() {
    return AXIOS.get(`${URL.ADMIN}/invitations`, { headers: headers() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  getUserInvitations(id) {
    return AXIOS.get(`${URL.ADMIN}/invitation/detail?id=${id}`, {
      headers: headers(),
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
};

export default InviteCode;
