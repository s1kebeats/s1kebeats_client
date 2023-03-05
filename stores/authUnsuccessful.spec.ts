import useAuthStore from './auth';
import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('./api/refresh', () => {
  return {
    default: () => {
      throw new Error('unauthorized');
    },
  };
});

describe('Auth Store checkAuth fail', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('checkAuth fail', async () => {
    const store = useAuthStore();

    await store.checkAuth();

    expect(store.authorized).toBe(false);
    expect(store.user).toBe(null);
  });
});
