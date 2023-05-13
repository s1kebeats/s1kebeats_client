import EmailActivationError from './EmailActivationError.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

const emailActivationErrorSelector = '[data-testid=emailActivationError]';
const errorTitleSelector = '[data-testid=errorTitle]';
const errorDescriptionSelector = '[data-testid=errorDescription]';

describe('EmailActivationError', () => {
  it('is not visible when emailActivationStore.error.state is false', async () => {
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
  it('is visible when emailActivationStore.error.state is true', async () => {
    const wrapper = shallowMount(EmailActivationError, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              emailActivation: {
                error: {
                  state: true,
                  status: null,
                },
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.find(emailActivationErrorSelector).exists()).toBe(true);
  });
  it('should render check link error when emailActivationStore.error.status is 404', async () => {
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
  it('should render unexpexted error when emailActivationStore.error.status is not 404', async () => {
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
