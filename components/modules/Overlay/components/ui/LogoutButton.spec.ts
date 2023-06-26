import { shallowMount } from '@vue/test-utils';
import LogoutButton from './LogoutButton.vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import useAuthStore from '@/stores/auth';
import useUiStore from '@/stores/ui';

const logoutButtonSelector = '[data-testid=logoutButton]';

vi.stubGlobal('navigateTo', vi.fn());

describe('LogoutButton', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  describe('User Interactions', () => {
    it('click - should redirect to logout page', async () => {
      const wrapper = shallowMount(LogoutButton, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const authStore = useAuthStore();
      const uiStore = useUiStore();

      await wrapper.get(logoutButtonSelector).trigger('click');
      vi.runAllTimers();

      expect(uiStore.setLoading).toHaveBeenCalledWith(true);
      expect(authStore.logout).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith('/login');
      expect(uiStore.setLoading).toHaveBeenCalledWith(false);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(LogoutButton);
    expect(wrapper.get(logoutButtonSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <nav-button-stub
          class="bg-red-500 text-white"
          data-testid="logoutButton"
          icon="streamline:entertainment-control-button-power-1-power-button-on-off"
          text="Выход"
        />,
      }
    `);
  });
});
