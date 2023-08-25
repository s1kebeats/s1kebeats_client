import { useAuthStore, useUiStore } from '@/stores';
import checkAuth from './checkAuth';
import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  Mock,
  beforeEach,
} from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

vi.mock('@/stores');

describe('checkAuth', () => {
  describe('fully mocked stores', () => {
    beforeAll(() => {
      (useAuthStore as unknown as Mock).mockReturnValueOnce(vi.fn());
      (useUiStore as unknown as Mock).mockReturnValueOnce(vi.fn());
    });
    afterAll(() => {
      vi.restoreAllMocks();
    });
    it('should return early when process.server is "true"', async () => {
      vi.spyOn(global, 'process', 'get').mockReturnValueOnce({
        server: true,
      } as NodeJS.Process);

      await checkAuth();
      expect(useAuthStore).not.toHaveBeenCalled();
      expect(useUiStore).not.toHaveBeenCalled();
    });
  });
  describe('partially mocked stores', () => {
    beforeAll(async () => {
      vi.useFakeTimers();
      setActivePinia(createPinia());

      const useAuthStoreActual = (
        await vi.importActual<typeof import('@/stores')>('@/stores')
      ).useAuthStore;
      const useUiStoreActual = (
        await vi.importActual<typeof import('@/stores')>('@/stores')
      ).useUiStore;

      (useAuthStore as unknown as Mock).mockReturnValue({
        ...useAuthStoreActual(),
        checkAuth: vi.fn(),
      });
      (useUiStore as unknown as Mock).mockReturnValue({
        ...useUiStoreActual(),
        setLoading: vi.fn(),
      });
    });
    beforeEach(() => {
      vi.clearAllMocks();
    });
    afterAll(() => {
      vi.restoreAllMocks();
    });
    it('should call authStore.checkAuth when process.server is "false" and authStore.authorized is null', async () => {
      vi.spyOn(global, 'process', 'get').mockReturnValueOnce({
        server: false,
      } as NodeJS.Process);
      const authStore = useAuthStore();
      authStore.authorized = null;

      await checkAuth();
      expect(authStore.checkAuth).toHaveBeenCalled();
    });
    it('should not call authStore.checkAuth when process.server is "false" and authStore.authorized is not null', async () => {
      vi.spyOn(global, 'process', 'get').mockReturnValueOnce({
        server: false,
      } as NodeJS.Process);
      const authStore = useAuthStore();
      authStore.authorized = false;

      await checkAuth();
      expect(authStore.checkAuth).not.toHaveBeenCalled();
    });
    it('should call uiStore.setLoading with false when process.server is "false" and authStore.authorized is null', async () => {
      vi.spyOn(global, 'process', 'get').mockReturnValueOnce({
        server: false,
      } as NodeJS.Process);
      const authStore = useAuthStore();
      const uiStore = useUiStore();
      authStore.authorized = null;

      await checkAuth();
      vi.runAllTimers();
      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.setLoading).toHaveBeenCalledWith(false);
    });
    it('should not call uiStore.setLoading when process.server is "false" and authStore.authorized is not null', async () => {
      vi.spyOn(global, 'process', 'get').mockReturnValueOnce({
        server: false,
      } as NodeJS.Process);
      const authStore = useAuthStore();
      const uiStore = useUiStore();
      authStore.authorized = false;

      await checkAuth();
      expect(uiStore.setLoading).not.toHaveBeenCalled();
    });
  });
});
