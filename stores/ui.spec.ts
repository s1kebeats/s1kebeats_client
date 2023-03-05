import usestore from './ui';
import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, test } from 'vitest';

describe('UI Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('set menuActive', () => {
    const store = usestore();

    expect(store.menuActive).toBe(false);

    store.setMenuActive(true);
    expect(store.menuActive).toBe(true);

    store.setMenuActive(false);
    expect(store.menuActive).toBe(false);
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
