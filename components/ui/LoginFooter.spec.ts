import { shallowMount } from '@vue/test-utils';
import LoginFooter from './LoginFooter.vue';
import { describe, it, expect } from 'vitest';

const loginFooterSelector = '[data-testid=loginFooter]';

describe('LoginFooter', () => {
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(LoginFooter);
    expect(wrapper.get(loginFooterSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <footer
          class="text-sm flex items-center gap-2"
          data-testid="loginFooter"
        >
          <!-- TODO: Rest password functionality -->
          <!-- &lt;nuxt-link
            to="/login"
            class="text-black font-semibold transition-all"
            &gt;Забыли пароль?&lt;/nuxt-link
          &gt;| -->
          <span
            class="text-black font-semibold transition-all"
          >
            Новый пользователь?
          </span>
          <nuxt-link
            class="text-[#7945fc] font-semibold transition-all hover:brightness-[75%]"
            to="/register"
          >
            Регистрация
          </nuxt-link>
        </footer>,
      }
    `);
  });
});
