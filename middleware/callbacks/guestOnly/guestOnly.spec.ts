import guestOnly from './guestOnly';
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '@/stores';

vi.stubGlobal('navigateTo', vi.fn());

describe('guestOnly', () => {
  beforeAll(() => {
    setActivePinia(createPinia());
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should call navigateTo with "/" if authStore.authorized is set to "true"', () => {
    const store = useAuthStore();
    store.authorized = true;

    guestOnly();
    expect(navigateTo).toHaveBeenCalled();
    expect(navigateTo).toHaveBeenCalledWith('/');
  });
  it('should not call navigateTo if authStore.authorized is set to "false"', () => {
    const store = useAuthStore();
    store.authorized = false;

    guestOnly();
    expect(navigateTo).not.toHaveBeenCalled();
  });
});
