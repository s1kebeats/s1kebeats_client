import usestore from './ui';
import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, test } from 'vitest';

describe('UI Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('set profileOverlay', () => {
    const store = usestore();

    expect(store.profileOverlay).toBe(false);

    store.setProfileOverlay(true);
    expect(store.profileOverlay).toBe(true);

    store.setProfileOverlay(false);
    expect(store.profileOverlay).toBe(false);
  });

  test('set loading', () => {
    const store = usestore();

    expect(store.loading).toBe(true);

    store.setLoading(false);
    expect(store.loading).toBe(false);

    store.setLoading(true);
    expect(store.loading).toBe(true);
  });
});
