import { describe, expect, it } from 'vitest';
import LoadingButton from './LoadingButton.vue';
import { shallowMount } from '@vue/test-utils';

const loadingSpinnerSelector = '[data-testid=loadingSpinner]';
const loadingButtonSpanSelector = '[data-testid=loadingButtonSpan]';

describe('LoadingButton', () => {
  describe('props', () => {
    it('pending - should render loading spinner without button span when set to true', () => {
      const wrapper = shallowMount(LoadingButton, {
        props: {
          pending: true,
        },
      });

      expect(wrapper.find(loadingSpinnerSelector).exists()).toBe(true);
      expect(wrapper.find(loadingButtonSpanSelector).exists()).toBe(false);
    });
    it('pending - should render span without loadingSpinner when set to false', () => {
      const wrapper = shallowMount(LoadingButton, {
        props: {
          pending: false,
        },
      });

      expect(wrapper.find(loadingSpinnerSelector).exists()).toBe(false);
      expect(wrapper.find(loadingButtonSpanSelector).exists()).toBe(true);
    });
  });
});
