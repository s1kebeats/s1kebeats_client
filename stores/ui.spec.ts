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
    test('toggleOverlay', () => {
      const store = useStore();
      store.toggleOverlay();
      expect(store.overlay).toBe(true);
      store.toggleOverlay();
      expect(store.overlay).toBe(false);
    });
    test('setOverlay - set true', () => {
      const store = useStore();
      store.setOverlay(true);
      expect(store.overlay).toBe(true);
    });
    test('setOverlay - set false', () => {
      const store = useStore();
      store.setOverlay(false);
      expect(store.overlay).toBe(false);
    });
    test('setLoading - set true', () => {
      const store = useStore();
      store.setLoading(true);
      expect(store.loading).toBe(true);
    });
    test('setLoading - set false', () => {
      const store = useStore();
      store.setLoading(false);
      expect(store.loading).toBe(false);
    });
  });
});
