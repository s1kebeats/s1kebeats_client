import { useUserStore } from '@/stores/user';
const userStore = useUserStore();
export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log(userStore.authorized);
  if (!userStore.authorized) {
    return await navigateTo('/login');
  }
});
