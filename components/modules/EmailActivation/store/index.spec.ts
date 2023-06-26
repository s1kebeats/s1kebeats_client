import useEmailActivationStore from '.';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import activate from '../api/activate';

vi.mock('../api/activate')

const testActivationString = 'activationString';

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
        await store.activate(testActivationString)
        expect(activate).toHaveBeenCalledWith(testActivationString)
    })
  })
});
