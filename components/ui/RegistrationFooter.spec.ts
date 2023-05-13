import { shallowMount } from '@vue/test-utils';
import RegistrationFooter from './RegistrationFooter.vue';
import { describe, it, expect } from 'vitest';

const registrationFooterSelector = '[data-testid=registrationFooter]';

describe('RegistrationFooter', () => {
  it('shapshot - should match the snapshot', () => {
    const wrapper = shallowMount(RegistrationFooter);
    expect(wrapper.get(registrationFooterSelector)).toMatchInlineSnapshot(`
          DOMWrapper {
            "isDisabled": [Function],
            "wrapperElement": <footer
              class="text-sm"
              data-testid="registrationFooter"
            >
               Уже есть аккаунт? 
              <nuxt-link
                class="text-[#7945fc] font-semibold transition-all hover:brightness-[75%]"
                to="/login"
              >
                Войдите
              </nuxt-link>
            </footer>,
          }
        `);
  });
});
