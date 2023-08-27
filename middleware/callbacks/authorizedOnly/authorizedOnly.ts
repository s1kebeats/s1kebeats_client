import { useAuthStore } from '@/stores';
export default function () {
  const authStore = useAuthStore();
  if (!authStore.authorized) {
    return navigateTo('/login');
  }
}
