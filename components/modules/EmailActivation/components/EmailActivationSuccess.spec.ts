import EmailActivationSuccess from './EmailActivationSuccess.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

const emailActivationSuccessSelector = '[data-testid=emailActivationSuccess]';

describe('EmailActivationSuccess', () => {
  it('is visible when emailActivationStore.error.state is false', async () => {
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
  it('is not visible when emailActivationStore.error.state is true', async () => {
    const wrapper = shallowMount(EmailActivationSuccess, {
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

    expect(wrapper.find(emailActivationSuccessSelector).exists()).toBe(false);
  });
});
