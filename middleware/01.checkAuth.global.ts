import { checkAuth } from './callbacks';
export default defineNuxtRouteMiddleware(checkAuth);
