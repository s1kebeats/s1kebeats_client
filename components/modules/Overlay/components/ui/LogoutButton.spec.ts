import { shallowMount } from '@vue/test-utils';
import LogoutButton from './LogoutButton.vue';
import { describe, expect, it, vi } from 'vitest';

const logoutButtonSelector = '[data-testid=logoutButton]';

vi.stubGlobal('navigateTo', vi.fn());

describe('LogoutButton', () => {
  describe('User Interactions', () => {
    it('click - should redirect to logout page', async () => {
      const wrapper = shallowMount(LogoutButton);
      await wrapper.get(logoutButtonSelector).trigger('click');
      expect(navigateTo).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith('/logout');
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(LogoutButton);
    expect(wrapper.get(logoutButtonSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <header-ui-nav-button-stub
          class="bg-red-500 text-white"
          data-testid="logoutButton"
          icon="streamline:entertainment-control-button-power-1-power-button-on-off"
          text="Выход"
        />,
      }
    `);
  });
});
