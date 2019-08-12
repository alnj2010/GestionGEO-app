import AXIOS from '../config/axios.config';
import { headers, URL } from './constants';

export const Minigame = {
  getTriviaList() {
    return AXIOS.get(`${URL.MINIGAME_TRIVIA}?join=questions&join=category`, {
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
  getCategoryList() {
    return AXIOS.get(`${URL.TRIVIA_CATEGORY}`, { headers: headers() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  findTriviaById(id) {
    return AXIOS.get(
      `${URL.MINIGAME_TRIVIA}/${id}?join=questions&join=category`,
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
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  saveTrivia(trivia) {
    return AXIOS.post(`${URL.MINIGAME_TRIVIA}`, trivia, {
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
  deleteTrivia(id) {
    return AXIOS.delete(`${URL.MINIGAME_TRIVIA}/${id}`, { headers: headers() })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error && error.response && error.response && error.response.data)
          return Promise.reject(error.response.data.message);
        return Promise.reject('Ups! Al parecer hay un error desconocido.');
      });
  },
  updateTrivia(trivia) {
    return AXIOS.patch(`${URL.MINIGAME_TRIVIA}/${trivia.id}`, trivia, {
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

export default Minigame;
