import authorizedOnly from './authorizedOnly';
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '@/stores';

vi.stubGlobal('navigateTo', vi.fn());

describe('authorizedOnly', () => {
  beforeAll(() => {
    setActivePinia(createPinia());
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should call navigateTo with "/login" if authStore.authorized is set to "false"', () => {
    const store = useAuthStore();
    store.authorized = false;

    authorizedOnly();
    expect(navigateTo).toHaveBeenCalled();
    expect(navigateTo).toHaveBeenCalledWith('/login');
  });
  it('should not call navigateTo if authStore.authorized is set to "true"', () => {
    const store = useAuthStore();
    store.authorized = true;

    authorizedOnly();
    expect(navigateTo).not.toHaveBeenCalled();
  });
});
