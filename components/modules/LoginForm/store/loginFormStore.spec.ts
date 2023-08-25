import { LoginRequestBodyMock } from '@/mocks/requestBodies';
import useStore from './loginFormStore';
import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, test } from 'vitest';

describe('LoginForm Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe('state', () => {
    test('mode - should be login', () => {
      const store = useStore();
      expect(store.mode).toBe('login');
    });
    test('credentials - should be empty object', () => {
      const store = useStore();
      expect(store.credentials).toStrictEqual({});
    });
  });
  describe('actions', () => {
    test('setMode - should set mode state to passed value', () => {
      const store = useStore();
      store.setMode('activation');
      expect(store.mode).toBe('activation');
    });
    test('setCredentials - should set credentials state to passed value', () => {
      const store = useStore();
      store.setCredentials(LoginRequestBodyMock);
      expect(store.credentials).toStrictEqual(LoginRequestBodyMock);
    });
  });
});
