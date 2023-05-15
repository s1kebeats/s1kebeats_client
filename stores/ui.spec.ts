import useStore from './ui';
import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, test } from 'vitest';

describe('UI Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe('state', () => {
    test('loading - should be true', () => {
      const store = useStore();
      expect(store.loading).toBe(true);
    });
    test('profileOverlay - should be false', () => {
      const store = useStore();
      expect(store.profileOverlay).toBeFalsy();
    });
  });
  describe('actions', () => {
    test('toggleProfileOverlay', () => {
      const store = useStore();
      store.toggleProfileOverlay();
      expect(store.profileOverlay).toBe(true);
      store.toggleProfileOverlay();
      expect(store.profileOverlay).toBeFalsy();
    });
    test('setProfileOverlay - set true', () => {
      const store = useStore();
      store.setProfileOverlay(true);
      expect(store.profileOverlay).toBe(true);
    });
    test('setProfileOverlay - set false', () => {
      const store = useStore();
      store.setProfileOverlay(false);
      expect(store.profileOverlay).toBeFalsy();
    });
    test('setLoading - set true', () => {
      const store = useStore();
      store.setLoading(true);
      expect(store.loading).toBe(true);
    });
    test('setLoading - set false', () => {
      const store = useStore();
      store.setLoading(false);
      expect(store.loading).toBeFalsy();
    });
  });
});
