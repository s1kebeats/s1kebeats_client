import EmailActivationError from './EmailActivationError.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

const emailActivationErrorSelector = '[data-testid=emailActivationError]';
const errorTitleSelector = '[data-testid=errorTitle]';
const errorDescriptionSelector = '[data-testid=errorDescription]';

describe('EmailActivationError', () => {
  describe('emailActivation store', () => {
    it('error.state - should not render when set to false', () => {
      const wrapper = shallowMount(EmailActivationError, {
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

      expect(wrapper.find(emailActivationErrorSelector).exists()).toBe(false);
    });
    it('error.state - should render when set to true', () => {
      const wrapper = shallowMount(EmailActivationError, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                emailActivation: {
                  error: {
                    state: true,
                    status: 404,
                  },
                },
              },
            }),
          ],
        },
      });

      expect(wrapper.find(emailActivationErrorSelector).exists()).toBe(true);
    });
    it('error.status - should render check link error when set to 404', async () => {
      const wrapper = shallowMount(EmailActivationError, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                emailActivation: {
                  error: {
                    state: true,
                    status: 404,
                  },
                },
              },
            }),
          ],
        },
      });

      expect(wrapper.get(errorTitleSelector).text()).toBe('Ошибка');
      expect(wrapper.get(errorDescriptionSelector).text()).toBe(
        'Проверьте ссылку'
      );
    });
    it('error.status - should render unexpexted error when seto to anything except 404', async () => {
      const wrapper = shallowMount(EmailActivationError, {
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

      expect(wrapper.get(errorTitleSelector).text()).toBe(
        'Произошла непредвиденная ошибка'
      );
      expect(wrapper.get(errorDescriptionSelector).text()).toBe(
        'Проверьте ваше интернет соединение'
      );
    });
  });
  it('snapshot - should match the shapshot', () => {
    const wrapper = shallowMount(EmailActivationError, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              emailActivation: {
                error: {
                  state: true,
                  status: 404,
                },
              },
            },
          }),
        ],
      },
    });
    expect(wrapper.get(emailActivationErrorSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="flex flex-col gap-1 items-center justify-center"
          data-testid="emailActivationError"
        >
          <icon
            color="#ff0000"
            name="material-symbols:warning-rounded"
            size="90px"
          />
          <div
            class="text-center flex flex-col gap-1"
          >
            <p
              class="text-md font-semibold"
              data-testid="errorTitle"
            >
              Ошибка
            </p>
            <p
              class="text-xs"
              data-testid="errorDescription"
            >
              Проверьте ссылку
            </p>
          </div>
        </div>,
      }
    `);
  });
});
