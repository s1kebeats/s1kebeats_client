import { useUserStore } from '~~/stores/user';
const userStore = useUserStore();
export default defineNuxtRouteMiddleware((to, from) => {
  console.log(userStore.authorized);
  if (!userStore.authorized) {
    return navigateTo('/login');
  }
});
