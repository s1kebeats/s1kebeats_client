import { shallowMount } from '@vue/test-utils';
import ConfirmEmailPopUp from './ConfirmEmailPopUp.vue';
import { describe, expect, it } from 'vitest';

const confirmEmailPopUpSelector = '[data-testid=confirmEmailPopUp]';

describe('ConfirmEmailPopUp', () => {
  describe('props', () => {
    it('open - should render invisible when set to false', () => {
      const wrapper = shallowMount(ConfirmEmailPopUp, {
        props: {
          open: false,
        },
      });
      expect(wrapper.get(confirmEmailPopUpSelector).isVisible()).toBeFalsy();
    });
    it('open - should render visible when set to true', () => {
      const wrapper = shallowMount(ConfirmEmailPopUp, {
        props: {
          open: true,
        },
      });
      expect(wrapper.get(confirmEmailPopUpSelector).isVisible()).toBeTruthy();
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(ConfirmEmailPopUp, {
      props: {
        open: true,
      },
    });
    expect(wrapper.get(confirmEmailPopUpSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="absolute z-[9999] w-full h-full backdrop-blur-sm rounded-lg flex flex-col items-center justify-center gap-2 font-semibold select-none"
          data-testid="confirmEmailPopUp"
          data-v-38d665d7=""
        >
          <icon
            color="#7945fc"
            data-v-38d665d7=""
            name="ic:sharp-alternate-email"
            size="50px"
          />
          <div
            class="flex flex-col gap-5"
            data-v-38d665d7=""
          >
            <p
              class="text-md"
              data-v-38d665d7=""
            >
              Подтвердите электронную почту
            </p>
            <!-- &lt;UiButton class="w-full h-[36px]" @click.prevent="loginRedirect"&gt;Вход&lt;/UiButton&gt; -->
          </div>
        </div>,
      }
    `);
  });
});
