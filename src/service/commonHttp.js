// src/services/commonHttp.js
import axios from 'axios';
import { notify } from './notify';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Set from .env in real apps
  headers: {
    'Content-Type': 'application/json',
  },
});


// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // config.headers.OS = `Windows`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optionally redirect to login or try refresh token
      notify.warning("Unauthorized! Redirecting to login...");
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);


export const commonHttp = {
  get: (url, config) => api.get(url, config),
  post: (url, data, config) => api.post(url, data, config),
  put: (url, data, config) => api.put(url, data, config),
  patch: (url, data, config) => api.patch(url, data, config),
  delete: (url, config) => api.delete(url, config),
};

export default commonHttp;