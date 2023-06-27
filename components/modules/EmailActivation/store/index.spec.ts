import useEmailActivationStore from '.';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import activate from '../api/activate';
import { AxiosError, AxiosResponse } from 'axios';

vi.mock('../api/activate');

const testActivationString = 'activationString';
const testErrorResponseStatus = 500;

describe('EmailActivation Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe('state', () => {
    it('loading - should be true', () => {
      const store = useEmailActivationStore();
      expect(store.loading).toBe(true);
    });
    it('error.status - should be null', () => {
      const store = useEmailActivationStore();
      expect(store.error.status).toBeNull();
    });
    it('error.state - should be false', () => {
      const store = useEmailActivationStore();
      expect(store.error.state).toBe(false);
    });
  });
  describe('actions', () => {
    it('activate - should call activate function with passed activation string', async () => {
      const store = useEmailActivationStore();
      await store.activate(testActivationString);
      expect(activate).toHaveBeenCalledWith(testActivationString);
    });
    it('activate - should set loading to false', async () => {
      const store = useEmailActivationStore();
      await store.activate(testActivationString);
      expect(store.loading).toBe(false);
    });
    it('activate - error, should set error.state to true and error.status', async () => {
      const store = useEmailActivationStore();
      const err = new AxiosError(
        'Async error',
        undefined,
        undefined,
        undefined,
        { status: testErrorResponseStatus } as AxiosResponse
      );
      (activate as Mock).mockRejectedValueOnce(err);
      await store.activate(testActivationString);
      expect(store.error.state).toBe(true);
      expect(store.error.status).toBe(testErrorResponseStatus);
    });
  });
});
