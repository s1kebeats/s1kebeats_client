import useAuthStore from './auth';
import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const testUser = {
  id: 1,
  email: 'test@example.com',
  username: 'test',
};

vi.mock('./api/refresh', () => {
  return {
    default: () => {
      return {
        data: {
          user: testUser,
        },
      };
    },
  };
});

describe('Auth Store checkAuth success', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('checkAuth success', async () => {
    const store = useAuthStore();

    await store.checkAuth();

    expect(store.authorized).toBe(true);
    expect(store.user).toEqual(testUser);
  });
});
