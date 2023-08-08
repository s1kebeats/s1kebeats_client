import useAuthStore from '@/stores/auth';
export default function () {
  const authStore = useAuthStore();
  if (!authStore.authorized) {
    return navigateTo('/login');
  }
}
