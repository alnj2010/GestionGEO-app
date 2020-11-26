import axios from 'axios';
import * as moment from 'moment';
import { loadProgressBar } from 'axios-progress-bar';
import {
  getSessionGeoToken,
  getInitTimeLogin,
  setInitTimeLogin,
  getTokenExpires,
  removeSessionGeoToken,
  setSessionGeoToken,
  setSessionUser,
} from '../storage/sessionStorage';
import { DURATION_TOAST, REFRESH_TIMEOUT } from '../services/constants';

export function headers(type) {
  let items;
  if (type === 'form') items = { 'Content-Type': 'multipart/form-data' };
  else items = { 'Content-Type': 'application/json' };
  const token = getSessionGeoToken();
  if (token) {
    items.Authorization = `Bearer ${token}`;
  }
  return items;
}
const AXIOS = axios.create({
  baseURL: window._env_.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Organization-Key': process.env.REACT_APP_ORGANIZATION_KEY,
  },
  timeout: 100000,
});

AXIOS.interceptors.response.use(
  (response) => {
    const { config, status } = response;
    const loginTimestamp = parseInt(getInitTimeLogin(), 10);
    const curretTimestamp = moment().unix();
    const sessionExpiresSecons = parseInt(getTokenExpires(), 10) * 60;
    const timeoutSession = sessionExpiresSecons - (curretTimestamp - loginTimestamp);

    response.data.error = response.data.message ? response.data.message : null;

    if (status === 206) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ response });
    }

    if (
      timeoutSession >= 0 &&
      timeoutSession <= REFRESH_TIMEOUT &&
      config.url !== `${config.baseURL}/refresh`
    ) {
      return AXIOS.post('/refresh', {}, { headers: headers() })
        .then((res) => {
          setInitTimeLogin(curretTimestamp);
          setSessionGeoToken(res.data.access_token);
          return response;
        })
        .catch(() => {
          removeSessionGeoToken();
        });
    }
    return response;
  },
  (error) => {
    const {
      response: { status },
    } = error;
    // eslint-disable-next-line no-param-reassign
    error.response.data.error =
      !error.response.data.error && error.response.data.message
        ? error.response.data.message
        : error.response.data.error;
    if (status === 401 && window.location.pathname !== '/') {
      setTimeout(() => {
        window.location.href = '/';
      }, DURATION_TOAST);
      return Promise.reject(error);
    }
    if (status === 403 && window.location.pathname !== '/') {
      setTimeout(() => {
        window.location.href = '/';
      }, DURATION_TOAST);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

loadProgressBar(undefined, AXIOS);
export default AXIOS;
