import axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';
import { apiUrl, headers } from '../services/constants';

const AXIOS = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000,
});

AXIOS.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    if (status === 401) {
      return AXIOS.get('/auth/refresh-token', { headers: headers() })
        .then(res => {
          sessionStorage.setItem('GeoToken', res.data.geoToken);
          originalRequest.headers['Authorization'] =
            'Bearer ' + res.data.geoToken;
          return axios(originalRequest);
        })
        .catch(error => {
          Promise.reject(error);
        });
    }
    if (status === 403) {
      window.location.href = '/';
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

loadProgressBar(undefined, AXIOS);
export default AXIOS;
