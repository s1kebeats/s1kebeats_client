import { describe, expect, it } from 'vitest';
import LoadingButton from './LoadingButton.vue';
import { shallowMount } from '@vue/test-utils';

const loadingSpinnerSelector = '[data-testid=loadingSpinner]';
const loadingButtonSpanSelector = '[data-testid=loadingButtonSpan]';
const loadingButtonSelector = '[data-testid=loadingButton]';

describe('LoadingButton', () => {
  describe('props', () => {
    it('pending - should render loading spinner without button span when set to true', () => {
      const wrapper = shallowMount(LoadingButton, {
        props: {
          pending: true,
        },
      });

      expect(wrapper.find(loadingSpinnerSelector).exists()).toBe(true);
      expect(wrapper.find(loadingButtonSpanSelector).exists()).toBeFalsy();
    });
    it('pending - should render span without loadingSpinner when set to false', () => {
      const wrapper = shallowMount(LoadingButton, {
        props: {
          pending: false,
        },
      });

      expect(wrapper.find(loadingSpinnerSelector).exists()).toBeFalsy();
      expect(wrapper.find(loadingButtonSpanSelector).exists()).toBe(true);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(LoadingButton, {
      props: {
        pending: false,
      },
    });
    expect(wrapper.get(loadingButtonSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <uibutton
          class="relative flex items-center justify-center h-[36px]"
          data-testid="loadingButton"
          data-v-eeae84fd=""
          type="submit"
        >
          <span
            data-testid="loadingButtonSpan"
            data-v-eeae84fd=""
          >
            
            
          </span>
        </uibutton>,
      }
    `);
  });
});
