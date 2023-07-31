import useStore from './tempAuth';
import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, test } from 'vitest';

const testData = {
  username: 'testUsername',
  password: 'testPassword',
  rememberMe: true,
};

describe('tempAuth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe('state', () => {
    test('username - should be empty string', () => {
      const store = useStore();
      expect(store.username).toBe('');
    });
    test('password - should be empty string', () => {
      const store = useStore();
      expect(store.password).toBe('');
    });
    test('rememberMe - should be false', () => {
      const store = useStore();
      expect(store.rememberMe).toBe(false);
    });
  });
  describe('actions', () => {
    test('setData - should set username, rememberMe and password', () => {
      const store = useStore();
      store.setData(testData);
      expect(store.username).toBe(testData.username);
      expect(store.rememberMe).toBe(testData.rememberMe);
      expect(store.password).toBe(testData.password);
    });
  });
  describe('getters', () => {
    test('getData - should return set data and reset the state', () => {
      const store = useStore();
      store.setData(testData);
      const data = store.getData();
      expect(data).toEqual(testData);
      expect(store.getData()).toEqual({});
    });
  });
});
