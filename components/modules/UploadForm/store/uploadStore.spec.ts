import useUploadStore from './index';
import { setActivePinia, createPinia } from 'pinia';
import { beforeEach, describe, expect, test } from 'vitest';

describe('Upload Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  test('increment page', () => {
    const store = useUploadStore();

    expect(store.page).toBe(1);

    store.incrementPage();
    expect(store.page).toBe(2);

    store.incrementPage();
    expect(store.page).toBe(3);
  });

  test('decrement page', () => {
    const store = useUploadStore();

    expect(store.page).toBe(1);

    store.decrementPage();
    expect(store.page).toBe(0);

    store.decrementPage();
    expect(store.page).toBe(-1);
  });
});
