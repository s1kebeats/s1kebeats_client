import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import type AuthResponse from './models/AuthResponse';

export const API_URL = 'http://localhost:5000/api';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.Authorization = `Bearer ${
    localStorage.getItem('accessToken') ?? ''
  }`;
  return config;
});

$api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: any) => {
    const request = error.config;
    if (error.response.status === 401) {
      const response = await axios.post<AuthResponse>('/refresh');
      localStorage.setItem('accessToken', response.data.accessToken);

      return await $api.request(request);
    } else {
      throw error;
    }
  }
);

export default $api;
