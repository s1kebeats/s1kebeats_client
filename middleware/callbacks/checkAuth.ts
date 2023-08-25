import { useAuthStore, useUiStore } from '@/stores';
export default async () => {
  if (process.server) return;
  const authStore = useAuthStore();
  if (authStore.authorized === null) {
    await authStore.checkAuth();
    const uiStore = useUiStore();
    setTimeout(() => uiStore.setLoading(false), 200);
  }
};
