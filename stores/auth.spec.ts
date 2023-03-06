import useAuthStore from './auth';
import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import User from '~~/api/models/User';

const testUser: User = {
  id: 1,
  email: 'test@example.com',
  username: 'test',
  image: null,
  displayedName: null,
};

vi.mock('./api/logout', () => {
  return {
    default: () => {
      return "success"
    },
  };
});

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('set user', () => {
    const store = useAuthStore();

    expect(store.user).toBe(null);

    store.setUser(testUser);
    expect(store.user).toEqual(testUser);

    store.setUser(null);
    expect(store.user).toBe(null);
  });

  test('set authorized', () => {
    const store = useAuthStore();

    expect(store.authorized).toBe(null);

    store.setAuthorized(true);
    expect(store.authorized).toBe(true);

    store.setAuthorized(false);
    expect(store.authorized).toBe(false);
  });

  test('logout', async () => {
    const store = useAuthStore()

    store.setUser(testUser)
    store.setAuthorized(true);

    await store.logout();

    expect(store.authorized).toBe(false);
    expect(store.user).toBe(null);
  })
});
