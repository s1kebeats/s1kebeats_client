import useAuthStore from './auth';
import { setActivePinia, createPinia } from 'pinia';
import { Mock, beforeEach, describe, expect, test, vi } from 'vitest';
import type User from '@/api/models/User';
import { authResponseMock } from './api/mocks';
import login from './api/login';
import logout from './api/logout';
import refresh from './api/refresh';

const testUser: User = {
  id: 1,
  email: 'test@example.com',
  username: 'test',
  image: null,
  displayedName: null,
};

vi.mock('./api/logout', () => {
  return {
    default: vi.fn(() => {
      return 'success';
    }),
  };
});
vi.mock('./api/login', () => {
  return {
    default: vi.fn(() => {
      return {
        data: authResponseMock,
      };
    }),
  };
});
vi.mock('./api/refresh', () => {
  return {
    default: vi.fn(() => {
      return {
        data: authResponseMock,
      };
    }),
  };
});

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe('state', () => {
    test('authorized - should be null', () => {
      const store = useAuthStore();
      expect(store.authorized).toBeNull();
    });
    test('user - should be null', () => {
      const store = useAuthStore();
      expect(store.user).toBeNull();
    });
  });
  describe('actions', () => {
    test('setUser - set object', () => {
      const store = useAuthStore();
      store.setUser(testUser);
      expect(store.user).toStrictEqual(testUser);
    });
    test('setUser - set null', () => {
      const store = useAuthStore();
      store.setUser(null);
      expect(store.user).toBeNull();
    });
    test('setAuthorized - set true', () => {
      const store = useAuthStore();
      store.setAuthorized(true);
      expect(store.authorized).toBe(true);
    });
    test('setAuthorized - set false', () => {
      const store = useAuthStore();
      store.setAuthorized(false);
      expect(store.authorized).toBe(false);
    });
    test('login - success', async () => {
      const store = useAuthStore();

      await store.login('username', 'password', true);
      expect(login).toHaveBeenCalled();
      expect(login).toHaveBeenCalledWith('username', 'password', true);
      expect(store.user).toStrictEqual(authResponseMock.user);
      expect(store.authorized).toBe(true);
    });
    test('login - error', async () => {
      const store = useAuthStore();
      (login as Mock).mockRejectedValueOnce(new Error('Async error'));
      try {
        await store.login('username', 'password', true);
      } catch (error) {
        expect(login).toHaveBeenCalled();
        expect(login).toHaveBeenCalledWith('username', 'password', true);
        expect(store.user).toBeNull();
        expect(store.authorized).toBe(false);
      }
    });
    test('logout - success', async () => {
      const store = useAuthStore();

      await store.logout();
      expect(logout).toHaveBeenCalled();
      expect(store.user).toBeNull();
      expect(store.authorized).toBe(false);
    });
    test('checkAuth - success', async () => {
      const store = useAuthStore();

      await store.checkAuth();
      expect(refresh).toHaveBeenCalled();
      expect(store.user).toStrictEqual(authResponseMock.user);
      expect(store.authorized).toBe(true);
    });
    test('checkAuth - error', async () => {
      const store = useAuthStore();
      (refresh as Mock).mockRejectedValueOnce(new Error('Async error'));
      try {
        await store.checkAuth();
      } catch (error) {
        expect(refresh).toHaveBeenCalled();
        expect(store.user).toBeNull();
        expect(store.authorized).toBe(false);
      }
    });
  });
});
