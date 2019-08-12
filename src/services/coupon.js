import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';
import Axios from 'axios';

export const Coupon = {
  getList() {
    return AXIOS.get(`${URL.COUPON}?join=brand&join=category&join=challengeTypes`, {
      headers: headers(),
    })
      .then(response => {
        return response.data;
      })
      .catch(({ error: { response: { data } } }) => {
        if (data) return Promise.reject(data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  findById(id) {
    return AXIOS.get(`${URL.COUPON}/${id}?join=brand&join=category&join=challengeTypes`, {
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
  save(coupon) {
    return AXIOS.post(`${URL.COUPON}`, coupon, {
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
  delete(id) {
    return AXIOS.delete(`${URL.COUPON}/${id}`, { headers: headers() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  update(coupon) {
    return AXIOS.patch(`${URL.COUPON}/${coupon.id}`, coupon, {
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
  uploadPhoto(photo, id) {
    const formData = new FormData();
    formData.append('photo', photo);
    return AXIOS.put(`${URL.COUPON}/upload/${id}`, formData, {
      headers: headers('form'),
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
  updateSettingsRC(settings) {
    return Axios.all([
      AXIOS.patch(`${URL.MASTER}/redeemInstructions`, settings[0], { headers: headers() }),
      AXIOS.patch(`${URL.MASTER}/barCode`, settings[1], { headers: headers() }),
      AXIOS.patch(`${URL.MASTER}/QRCode`, settings[2], { headers: headers() }),
      AXIOS.patch(`${URL.MASTER}/redeemErrorSubtitle`, settings[3], { headers: headers() }),
      AXIOS.patch(`${URL.MASTER}/redeemErrorMessage`, settings[4], { headers: headers() }),
      AXIOS.patch(`${URL.MASTER}/supportEmail`, settings[5], { headers: headers() }),
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
  getSettingsRC() {
    return Axios.all([
      AXIOS.get(`${URL.MASTER}/redeemInstructions`, { headers: headers() }),
      AXIOS.get(`${URL.MASTER}/barCode`, { headers: headers() }),
      AXIOS.get(`${URL.MASTER}/QRCode`, { headers: headers() }),
      AXIOS.get(`${URL.MASTER}/redeemErrorSubtitle`, { headers: headers() }),
      AXIOS.get(`${URL.MASTER}/redeemErrorMessage`, { headers: headers() }),
      AXIOS.get(`${URL.MASTER}/supportEmail`, { headers: headers() }),
    ])
      .then(response => {
        let data={}
        response.forEach((value)=>data[value.data.key]=value.data.value)
        return data;
      })
      .catch(error => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  getListRC() {
    return AXIOS.get(`${URL.COUPON}/redeemed`, {
      headers: headers(),
    })
      .then(response => {
        return response.data;
      })
      .catch(({ error: { response: { data } } }) => {
        if (data) return Promise.reject(data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  findRCById(id) {
    return AXIOS.get(`${URL.COUPON}/redeemed/${id}/`, {
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

export default Coupon;
