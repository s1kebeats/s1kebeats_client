import { shallowMount } from '@vue/test-utils';
import RegisterButton from './RegisterButton.vue';
import { describe, expect, it, vi } from 'vitest';

const registerButtonSelector = '[data-testid=registerButton]';

vi.stubGlobal('navigateTo', vi.fn());

describe('RegisterButton', () => {
  describe('User Interactions', () => {
    it('click - should redirect to register page', async () => {
      const wrapper = shallowMount(RegisterButton);
      await wrapper.get(registerButtonSelector).trigger('click');
      expect(navigateTo).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith('/register');
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(RegisterButton);
    expect(wrapper.get(registerButtonSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <nav-button-stub
          class="bg-[#7945fc] text-white"
          data-testid="registerButton"
          icon="streamline:interface-user-add-actions-add-close-geometric-human-person-plus-single-up-user"
          text="Регистрация"
        />,
      }
    `);
  });
});
