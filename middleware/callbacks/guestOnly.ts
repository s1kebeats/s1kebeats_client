import useAuthStore from '@/stores/auth';
export default () => {
  const authStore = useAuthStore();
  if (authStore.authorized) {
    return navigateTo('/');
  }
};
