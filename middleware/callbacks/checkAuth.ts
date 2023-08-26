import { useAuthStore, useUiStore } from '@/stores';
import { execWithTimeout } from '@/composables';
export default async () => {
  if (process.server) return;
  const authStore = useAuthStore();
  if (authStore.authorized === null) {
    const uiStore = useUiStore();
    await execWithTimeout(authStore.checkAuth(), 200);
    uiStore.setLoading(false);
  }
};
