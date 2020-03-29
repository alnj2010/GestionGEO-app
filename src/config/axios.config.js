import axios from "axios";
import { loadProgressBar } from "axios-progress-bar";

export function headers(type) {
  let items;
  if (type === "form") items = { "Content-Type": "multipart/form-data" };
  else items = { "Content-Type": "application/json" };
  const token = sessionStorage.getItem("GeoToken");
  if (token) {
    items.Authorization = `Bearer ${token}`;
  }
  return items;
}

const AXIOS = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Organization-Key": "G"
  },
  timeout: 100000
});

AXIOS.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const {
      config,
      response: { status }
    } = error;
    const originalRequest = config;

    if (status === 401) {
      return AXIOS.get("/auth/refresh-token", { headers: headers() })
        .then(res => {
          sessionStorage.setItem("GeoToken", res.data.geoToken);
          originalRequest.headers["Authorization"] =
            "Bearer " + res.data.geoToken;
          return axios(originalRequest);
        })
        .catch(error => {
          Promise.reject(error);
        });
    }
    if (status === 403) {
      window.location.href = "/";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

loadProgressBar(undefined, AXIOS);
export default AXIOS;
