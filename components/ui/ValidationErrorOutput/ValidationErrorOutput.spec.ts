import { describe, expect, it } from 'vitest';
import ValidationErrorOutput from './ValidationErrorOutput.vue';
import { shallowMount } from '@vue/test-utils';

const validationErrorOutputSelector = '[data-testid=validationErrorOutput]';

describe('ValidationErrorOutput', async () => {
  describe('props', () => {
    it('errors - should not render ouptut when empty error list provided', () => {
      const wrapper = shallowMount(ValidationErrorOutput, {
        props: {
          errors: [],
        },
      });

      expect(wrapper.find(validationErrorOutputSelector).exists()).toBe(false);
    });
    it('errors - should render output when populated error list provided', () => {
      const wrapper = shallowMount(ValidationErrorOutput, {
        props: {
          errors: ['error'],
        },
      });

      expect(wrapper.find(validationErrorOutputSelector).exists()).toBe(true);
    });
    it('errors - should render first error message from error list', () => {
      const wrapper = shallowMount(ValidationErrorOutput, {
        props: {
          errors: ['first', 'second'],
        },
      });

      expect(wrapper.find(validationErrorOutputSelector).text()).toBe('first');
    });
  });
});
