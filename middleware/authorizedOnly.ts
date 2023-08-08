import auth from './callbacks/authorizedOnly';
export default defineNuxtRouteMiddleware(auth);
