import axios from 'axios';
import { returnResponse, errorHandler, setAuthHeader } from './interceptors';

export const API_URL = 'http://192.168.1.135:5000/api';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(setAuthHeader);

$api.interceptors.response.use(returnResponse, errorHandler);

export default $api;
