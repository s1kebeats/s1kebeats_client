import useAuthStore from './auth';
import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const testUser = {
  id: 1,
  email: 'test@example.com',
  username: 'test',
};

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
});
