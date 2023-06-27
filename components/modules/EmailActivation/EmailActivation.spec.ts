import EmailActivation from './EmailActivation.vue';
import { describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import useEmailActivationStore from './store';

const testActivationString = 'activationString';

const loadingSpinnerSelector = '[data-testid=loadingSpinner]';
const emailActivationInfoSelector = '[data-testid=emailActivationInfo]';

vi.stubGlobal('useRoute', () => {
  return {
    path: `/activate/${testActivationString}`,
  };
});

describe('EmailActivation', () => {
  describe('emailActivation store', () => {
    it('loading - should render LoadingSpinner when set to true', () => {
      const wrapper = shallowMount(EmailActivation, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                emailActivation: {
                  loading: true,
                },
              },
            }),
          ],
        },
      });
      expect(wrapper.find(loadingSpinnerSelector).exists()).toBe(true);
    });
    it('loading - should not render email activation info when set to true', () => {
      const wrapper = shallowMount(EmailActivation, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                emailActivation: {
                  loading: true,
                },
              },
            }),
          ],
        },
      });
      expect(wrapper.find(emailActivationInfoSelector).exists()).toBe(false);
    });
    it('loading - should not render LoadingSpinner when set to false', () => {
      const wrapper = shallowMount(EmailActivation, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                emailActivation: {
                  loading: false,
                },
              },
            }),
          ],
        },
      });
      expect(wrapper.find(loadingSpinnerSelector).exists()).toBe(false);
    });
    it('loading - should render email activation info when set to false', () => {
      const wrapper = shallowMount(EmailActivation, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                emailActivation: {
                  loading: false,
                },
              },
            }),
          ],
        },
      });
      expect(wrapper.find(emailActivationInfoSelector).exists()).toBe(true);
    });
  });
  it('should call emailActivationStore.activate onMounted with valid param', () => {
    shallowMount(EmailActivation, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: true,
          }),
        ],
      },
    });
    const store = useEmailActivationStore();
    expect(store.activate).toHaveBeenCalledWith(testActivationString);
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(EmailActivation, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              emailActivation: {
                loading: false,
              },
            },
          }),
        ],
      },
    });
    expect(wrapper.get(emailActivationInfoSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="grow flex flex-col items-center justify-center gap-5 font-medium"
          data-testid="emailActivationInfo"
        >
          <email-activation-success-stub />
          <email-activation-error-stub />
        </div>,
      }
    `);
  });
});
