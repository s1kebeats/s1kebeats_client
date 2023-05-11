import useAuthStore from './auth';
import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import type User from '@/api/models/User';
import { authResponseMock } from './api/mocks';
import login from './api/login';

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
      return 'success';
    },
  };
});
vi.mock('./api/login', () => {
  return {
    default: () => {
      return {
        data: authResponseMock
      };
    },
  };
});
vi.mock('./api/refresh', () => {
  return {
    default: () => {
      return 'success';
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

  test('login - success', async () => {
    const store = useAuthStore();

    await store.login('username', 'password', true);

    expect(store.user).toStrictEqual(authResponseMock.user);
    expect(store.authorized).toBe(true);
  });
  test('login - error', async () => {
    const store = useAuthStore();
    login.mockResolvedValueOnce(() => {
      throw new Error();
    });
    await store.login('username', 'password', true);

    expect(store.user).toBe(null);
    expect(store.authorized).toBe(false);
  });
});
