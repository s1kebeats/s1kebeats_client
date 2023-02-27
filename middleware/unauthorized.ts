import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
export default defineNuxtRouteMiddleware((to, from) => {
  if (userStore.authorized) {
    return navigateTo('/');
  }
});
