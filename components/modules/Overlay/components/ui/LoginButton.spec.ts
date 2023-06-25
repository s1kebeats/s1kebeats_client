import { shallowMount } from '@vue/test-utils';
import LoginButton from './LoginButton.vue';
import { describe, expect, it, vi } from 'vitest';

const loginButtonSelector = '[data-testid=loginButton]';

vi.stubGlobal('navigateTo', vi.fn());

describe('LoginButton', () => {
  describe('User Interactions', () => {
    it('click - should redirect to login page', async () => {
      const wrapper = shallowMount(LoginButton);
      await wrapper.get(loginButtonSelector).trigger('click');
      expect(navigateTo).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith('/login');
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(LoginButton);
    expect(wrapper.get(loginButtonSelector)).toMatchInlineSnapshot(`
          DOMWrapper {
            "isDisabled": [Function],
            "wrapperElement": <header-ui-nav-button-stub
              class="bg-black text-white"
              data-testid="loginButton"
              icon="material-symbols:login-rounded"
              text="Вход"
            />,
          }
        `);
  });
});
