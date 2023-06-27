import EmailActivationSuccess from './EmailActivationSuccess.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

const emailActivationSuccessSelector = '[data-testid=emailActivationSuccess]';

describe('EmailActivationSuccess', () => {
  describe('emailActivation store', () => {
    it('error.state - should not render when set to true', () => {
      const wrapper = shallowMount(EmailActivationSuccess, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                emailActivation: {
                  error: {
                    state: true,
                    status: 500,
                  },
                },
              },
            }),
          ],
        },
      });

      expect(wrapper.find(emailActivationSuccessSelector).exists()).toBe(false);
    });
    it('error.state - should render when set to false', () => {
      const wrapper = shallowMount(EmailActivationSuccess, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                emailActivation: {
                  error: {
                    state: false,
                    status: null,
                  },
                },
              },
            }),
          ],
        },
      });

      expect(wrapper.find(emailActivationSuccessSelector).exists()).toBe(true);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(EmailActivationSuccess, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              emailActivation: {
                error: {
                  state: false,
                  status: null,
                },
              },
            },
          }),
        ],
      },
    });
    expect(wrapper.get(emailActivationSuccessSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="text-center font-semibold flex flex-col items-center justify-center gap-1"
          data-testid="emailActivationSuccess"
        >
          <icon
            name="ep:success-filled"
            size="90px"
          />
           Электронная почта подтверждена 
          <nuxt-link
            class="text-[#7945fc] text-sm transition-all hover:brightness-[75%]"
            to="/login"
          >
            Вход
          </nuxt-link>
        </div>,
      }
    `);
  });
});
