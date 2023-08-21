import axios from 'axios';
import setAuthHeader from './interceptors/setAuthHeader';
import errorHandler from './interceptors/errorHandler';
import returnResponse from './interceptors/returnResponse';

const $api = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL,
});

$api.interceptors.request.use(setAuthHeader);

$api.interceptors.response.use(returnResponse, errorHandler);

export default $api;
