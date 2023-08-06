import { type AxiosRequestConfig } from 'axios';

export default function (config: AxiosRequestConfig) {
  if (!('headers' in Object.keys(config))) {
    config.headers = {};
  }
  config.headers!.Authorization = `Bearer ${
    localStorage.getItem('accessToken') ?? ''
  }`;
  return config;
}
