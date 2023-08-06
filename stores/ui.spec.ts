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
    test('overlay - should be false', () => {
      const store = useStore();
      expect(store.overlay).toBe(false);
    });
  });
  describe('actions', () => {
    test('toggleOverlay - shuould toggle overlay state', () => {
      const store = useStore();
      store.toggleOverlay();
      expect(store.overlay).toBe(true);
      store.toggleOverlay();
      expect(store.overlay).toBe(false);
    });
    test('setOverlay - should set overlay state to true when called with true', () => {
      const store = useStore();
      store.setOverlay(true);
      expect(store.overlay).toBe(true);
    });
    test('setOverlay - should set overlay state to false when called with false', () => {
      const store = useStore();
      store.setOverlay(false);
      expect(store.overlay).toBe(false);
    });
    test('setLoading - should set loading state to true when called with true', () => {
      const store = useStore();
      store.setLoading(true);
      expect(store.loading).toBe(true);
    });
    test('setLoading - should set loading state to false when called with false', () => {
      const store = useStore();
      store.setLoading(false);
      expect(store.loading).toBe(false);
    });
  });
});
