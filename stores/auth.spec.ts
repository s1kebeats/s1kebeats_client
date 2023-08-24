import useAuthStore from './auth';
import { setActivePinia, createPinia } from 'pinia';
import {
  Mock,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  test,
  vi,
} from 'vitest';
import type User from '@/api/models/User';
import { AuthResponseMock } from '@/mocks/responses';
import { showUnexpectedError } from '@/composables';
import { login, logout, refresh, activate } from './api';
import { LoginRequestBodyMock } from '@/mocks/requestBodies';

vi.mock('@/composables', () => {
  return {
    showUnexpectedError: vi.fn(),
  };
});

const testError = () => new Error('Api error');

const testUser: User = {
  id: 1,
  email: 'test@example.com',
  username: 'test',
  image: null,
  displayedName: null,
};

vi.mock('./api', () => {
  return {
    logout: vi.fn(),
    activate: vi.fn(),
    login: vi.fn(() => AuthResponseMock),
    refresh: vi.fn(() => AuthResponseMock),
  };
});

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
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
    test('setUser - should set store.user to provided value', () => {
      const store = useAuthStore();
      store.setUser(testUser);
      expect(store.user).toStrictEqual(testUser);
      store.setUser(null);
      expect(store.user).toBeNull();
    });
    test('setAuthorized - should set store.authorized to provided value', () => {
      const store = useAuthStore();
      store.setAuthorized(true);
      expect(store.authorized).toBe(true);
      store.setAuthorized(false);
      expect(store.authorized).toBe(false);
    });
    describe('activate', () => {
      it('should call activate function with passed activationCode', async () => {
        const testCode = 'testCode';
        const store = useAuthStore();

        await store.activate(testCode);
        expect(activate).toHaveBeenCalled();
        expect(activate).toHaveBeenCalledWith(testCode);
      });
      describe('activate - error', () => {
        beforeAll(() => {
          (activate as Mock).mockRejectedValue(testError());
        });
        it('should throw error', async () => {
          const store = useAuthStore();
          expect(() => store.activate('code')).rejects.toThrowError();
        });
        it('should throw error returned from activate', async () => {
          const store = useAuthStore();
          try {
            await store.activate('code');
          } catch (error) {
            expect(error).toStrictEqual(testError());
          }
        });
      });
    });
    describe('login', () => {
      it('should call login function with passed params', async () => {
        const store = useAuthStore();

        await store.login(LoginRequestBodyMock);
        expect(login).toHaveBeenCalled();
        expect(login).toHaveBeenCalledWith(LoginRequestBodyMock);
      });
      describe('login - success', () => {
        it('should set store.user to data received from login', async () => {
          const store = useAuthStore();

          await store.login(LoginRequestBodyMock);
          expect(store.user).toStrictEqual(AuthResponseMock.data.user);
        });
        it('should set store.authorized to "true"', async () => {
          const store = useAuthStore();
          store.authorized = false;

          await store.login(LoginRequestBodyMock);
          expect(store.authorized).toBe(true);
        });
      });
      describe('login - error', () => {
        beforeAll(() => {
          (login as Mock).mockRejectedValue(testError());
        });
        it('should throw error', async () => {
          const store = useAuthStore();
          expect(() =>
            store.login(LoginRequestBodyMock)
          ).rejects.toThrowError();
        });
        it('should throw error returned from login', async () => {
          const store = useAuthStore();
          try {
            await store.login(LoginRequestBodyMock);
          } catch (error) {
            expect(error).toStrictEqual(testError());
          }
        });
        it('should set store.authorized to "false"', async () => {
          const store = useAuthStore();
          store.authorized = true;
          try {
            await store.login(LoginRequestBodyMock);
          } catch (error) {
            expect(store.authorized).toBe(false);
          }
        });
      });
    });
    describe('logout', () => {
      it('should call logout function', async () => {
        const store = useAuthStore();

        await store.logout();
        expect(logout).toHaveBeenCalled();
      });
      describe('logout - success', () => {
        it('should set store.user to "null"', async () => {
          const store = useAuthStore();
          store.user = {} as User;

          await store.logout();
          expect(store.user).toBeNull();
        });
        it('should set store.authorized to "false"', async () => {
          const store = useAuthStore();
          store.authorized = true;

          await store.logout();
          expect(store.authorized).toBe(false);
        });
      });
      describe('logout - error', () => {
        beforeAll(() => {
          (logout as Mock).mockRejectedValue(testError());
        });
        it('should call showUnexpectedError with error from logout()', async () => {
          const store = useAuthStore();
          await store.logout();
          expect(showUnexpectedError).toHaveBeenCalled();
          expect(showUnexpectedError).toHaveBeenCalledWith(testError());
        });
      });
    });
    describe('checkAuth', () => {
      it('should call refresh function', async () => {
        const store = useAuthStore();

        await store.checkAuth();
        expect(refresh).toHaveBeenCalled();
      });
      describe('refresh - success', () => {
        it('should set store.user to data received from refresh', async () => {
          const store = useAuthStore();

          await store.checkAuth();
          expect(store.user).toStrictEqual(AuthResponseMock.data.user);
        });
        it('should set store.authorized to "true"', async () => {
          const store = useAuthStore();

          await store.checkAuth();
          expect(store.authorized).toBe(true);
        });
      });
      describe('refresh - error', () => {
        beforeAll(() => {
          (refresh as Mock).mockRejectedValue(testError());
        });
        it('should set store.user to "null"', async () => {
          const store = useAuthStore();
          store.user = {} as User;

          await store.checkAuth();
          expect(store.user).toBeNull();
        });
        it('should set store.authorized to "false"', async () => {
          const store = useAuthStore();
          store.authorized = true;

          await store.checkAuth();
          expect(store.authorized).toBe(false);
        });
        it('should call showUnexpectedError with error from refresh() when error.response.status is not 401', async () => {
          const store = useAuthStore();
          await store.checkAuth();
          expect(showUnexpectedError).toHaveBeenCalled();
          expect(showUnexpectedError).toHaveBeenCalledWith(testError());
        });
        it('should not call showUnexpectedError when error.response.status is 401', async () => {
          const store = useAuthStore();
          (refresh as Mock).mockRejectedValueOnce({
            response: {
              status: 401,
            },
          });
          await store.checkAuth();
          expect(showUnexpectedError).not.toHaveBeenCalled();
        });
      });
    });
  });
});
