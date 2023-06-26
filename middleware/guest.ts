import useAuthStore from '@/stores/auth';
export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();
  if (authStore.authorized) {
    console.log(authStore.authorized);
    return navigateTo('/');
  }
});
