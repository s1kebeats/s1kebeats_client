import useAuthStore from '@/stores/auth';
import useUiStore from '@/stores/ui';
export default async () => {
  if (process.server) return;
  const authStore = useAuthStore();
  if (authStore.authorized === null) {
    await authStore.checkAuth();
    const uiStore = useUiStore();
    setTimeout(() => uiStore.setLoading(false), 200);
  }
};
