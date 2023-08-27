import { useAuthStore } from '@/stores';
export default () => {
  const authStore = useAuthStore();
  if (authStore.authorized) {
    return navigateTo('/');
  }
};
