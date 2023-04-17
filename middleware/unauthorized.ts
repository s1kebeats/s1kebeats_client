import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (userStore.authorized) {
    return await navigateTo('/');
  }
});
