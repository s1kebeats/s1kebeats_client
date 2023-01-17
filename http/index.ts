import axios, { AxiosRequestConfig } from 'axios';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL ?? 'http://localhost:5000/api',
});

$api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers!.Authorization = `Bearer ${localStorage.getItem(
    'accessToken'
  )}`;
  return config;
});

export default $api;
