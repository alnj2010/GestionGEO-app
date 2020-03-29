import axios from 'axios';
import { loadProgressBar } from 'axios-progress-bar';
import {
    getSessionGeoToken,
    setSessionGeoToken,
} from '../storage/sessionStorage';

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
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Organization-Key': 'G',
    },
    timeout: 100000,
});

AXIOS.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const {
            response: { status },
        } = error;

        if (status === 401) {
            Promise.reject(error);
        }
        if (status === 403) {
            window.location.href = '/';
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

loadProgressBar(undefined, AXIOS);
export default AXIOS;
