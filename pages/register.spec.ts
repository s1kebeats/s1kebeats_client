import register from './register.vue';
import { describe, it, expect, vi } from 'vitest';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import useUiStore from '@/stores/ui';

const registrationFormSelector = '[data-testid=registrationForm]';

vi.stubGlobal('navigateTo', vi.fn());
vi.stubGlobal('definePageMeta', vi.fn());

describe('register', () => {
  describe('User Interactions', () => {
    it('registrationForm submit event - should redirect to "/login" and turn uiLoadingScreen off', async () => {
      const wrapper = shallowMount(register, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const uiStore = useUiStore();
      await (
        wrapper.getComponent(registrationFormSelector) as VueWrapper
      ).vm.$emit('success');
      expect(navigateTo).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith('/login');
      vi.runAllTimers();
      expect(uiStore.setLoading).toHaveBeenCalledWith(false);
    });
  });
});
