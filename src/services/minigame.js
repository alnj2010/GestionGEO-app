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
        return Promise.reject('Unknow error');
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
        return Promise.reject('Unknow error');
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
        return Promise.reject('Unknow error');
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
        return Promise.reject('Unknow error');
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
        return Promise.reject('Unknow error');
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
        return Promise.reject('Unknow error');
      });
  },
};

export default Minigame;
