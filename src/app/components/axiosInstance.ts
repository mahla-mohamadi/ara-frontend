import axios from 'axios';
import { getCookie } from '@/utils';

const API = axios.create({
  baseURL: 'http://localhost/ara-backend/public/api',
});

API.interceptors.request.use(
  (config) => {
    const token = getCookie('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
