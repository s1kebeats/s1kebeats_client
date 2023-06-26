import useAuthStore from '@/stores/auth';
import useUiStore from '@/stores/ui';

export default defineNuxtRouteMiddleware(async () => {
  if (process.server) return;
  const authStore = useAuthStore();
  const uiStore = useUiStore();
  if (authStore.authorized === null) {
    await authStore.checkAuth();
    setTimeout(() => uiStore.setLoading(false), 200);
  }
});
