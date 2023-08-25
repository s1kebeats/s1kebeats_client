import axios from 'axios';
import { returnResponse, errorHandler, setAuthHeader } from './interceptors';
import { API_URL } from '@/nuxt.config';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(setAuthHeader);

$api.interceptors.response.use(returnResponse, errorHandler);

export default $api;
