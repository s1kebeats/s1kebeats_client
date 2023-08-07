import axios from 'axios';
import setAuthHeader from './interceptors/setAuthHeader';
import errorHandler from './interceptors/errorHandler';
import returnResponse from './interceptors/returnResponse';

export const API_URL = 'http://192.168.1.135:5000/api';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(setAuthHeader);

$api.interceptors.response.use(returnResponse, errorHandler);

export default $api;
