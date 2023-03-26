import axios, { AxiosRequestConfig } from 'axios';
import AuthResponse from './models/AuthResponse';

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem(
    'accessToken'
  )}`;
  return config;
});

$api.interceptors.response.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  async (error: any) => {
    const request = error.config;
    if (error.response.status === 401) {
      try {
        const response = await $api.post<AuthResponse>(`/refresh`);
        localStorage.setItem('accessToken', response.data.accessToken);

        return $api.request(request);
      } catch (error) {
        throw error;
      }
    } else {
      throw error;
    }
  }
);

export default $api;
