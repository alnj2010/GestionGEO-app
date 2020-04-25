import AXIOS, { headers } from '../config/axios.config';
import { URL } from './constants';

export const User = {
  login({ identification, password, user_type }) {
    const formData = {
      identification,
      password,
      user_type,
    };

    return AXIOS.post(`${URL.AUTH}`, formData, { headers: headers() })
      .then((response) => {
        if (response.status && response.status !== 200) {
          const error = { response };
          throw error;
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.error);
        return Promise.reject(new Error('Ups! Al parecer hay un error desconocido.'));
      });
  },

  getList() {
    return AXIOS.get(`${URL.ADMIN}?join=profile`, { headers: headers() })
      .then((response) => {
        if (response.status && response.status !== 200) {
          const error = { response };
          throw error;
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.error);
        return Promise.reject(new Error('Ups! Al parecer hay un error desconocido.'));
      });
  },
  getWinnersList() {
    return AXIOS.get(`${URL.ADMIN}/leaderboard`, {
      headers: headers(),
    })
      .then((response) => {
        if (response.status && response.status !== 200) {
          const error = { response };
          throw error;
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.error);
        return Promise.reject(new Error('Ups! Al parecer hay un error desconocido.'));
      });
  },
  getAdminList() {
    return AXIOS.get(`${URL.ADMIN}`, {
      headers: headers(),
    })
      .then((response) => {
        if (response.status && response.status !== 200) {
          const error = { response };
          throw error;
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.error);
        return Promise.reject(new Error('Ups! Al parecer hay un error desconocido.'));
      });
  },
  findById(id) {
    return AXIOS.get(`${URL.ADMIN}?filter=id||eq||${id}&join=profile`, {
      headers: headers(),
    })
      .then((response) => {
        if (response.status && response.status !== 200) {
          const error = { response };
          throw error;
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.error);
        return Promise.reject(new Error('Ups! Al parecer hay un error desconocido.'));
      });
  },

  findAdminById(id) {
    return AXIOS.get(`${URL.ADMIN}/${id}`, {
      headers: headers(),
    })
      .then((response) => {
        if (response.status && response.status !== 200) {
          const error = { response };
          throw error;
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.error);
        return Promise.reject(new Error('Ups! Al parecer hay un error desconocido.'));
      });
  },
  update(player) {
    return AXIOS.put(`${URL.ADMIN}/${player.id}`, player, {
      headers: headers(),
    })
      .then((response) => {
        if (response.status && response.status !== 200) {
          const error = { response };
          throw error;
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.error);
        return Promise.reject(new Error('Ups! Al parecer hay un error desconocido.'));
      });
  },
  save(player) {
    return AXIOS.post(`${URL.ADMIN}`, player, {
      headers: headers(),
    })
      .then((response) => {
        if (response.status && response.status !== 200) {
          const error = { response };
          throw error;
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.error);
        return Promise.reject(new Error('Ups! Al parecer hay un error desconocido.'));
      });
  },

  saveAdmin(admin) {
    return AXIOS.post(`${URL.ADMIN}`, admin, {
      headers: headers(),
    })
      .then((response) => {
        if (response.status && response.status !== 200) {
          const error = { response };
          throw error;
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.error);
        return Promise.reject(new Error('Ups! Al parecer hay un error desconocido.'));
      });
  },
  delete(adminId) {
    return AXIOS.delete(`${URL.ADMIN}/${adminId}`, {
      headers: headers(),
    })
      .then((response) => {
        if (response.status && response.status !== 200) {
          const error = { response };
          throw error;
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.error);
        return Promise.reject(new Error('Ups! Al parecer hay un error desconocido.'));
      });
  },
  uploadPhoto(photo, id) {
    const formData = new FormData();
    formData.append('photo', photo);
    return AXIOS.put(`${URL.ADMIN}/upload/${id}`, formData, {
      headers: headers('form'),
    })
      .then((response) => {
        if (response.status && response.status !== 200) {
          const error = { response };
          throw error;
        }
        return response.data;
      })
      .catch((error) => {
        if (error && error.response && error.response.data)
          return Promise.reject(error.response.data.error);
        return Promise.reject(new Error('Ups! Al parecer hay un error desconocido.'));
      });
  },
};

export default User;
