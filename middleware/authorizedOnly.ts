import { authorizedOnly } from './callbacks';
export default defineNuxtRouteMiddleware(authorizedOnly);
