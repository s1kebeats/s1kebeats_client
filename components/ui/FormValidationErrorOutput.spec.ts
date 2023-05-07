import { describe, expect, it } from 'vitest';
import FormValidationErrorOutput from './FormValidationErrorOutput.vue';
import { mount } from '@vue/test-utils';
import { type Validation } from '@vuelidate/core';

const errorListSelector = '[data-testid=errorList]';

describe('FormValidationErrorOutput', async () => {
  describe('props', () => {
    it('v - should not render with empty error list', () => {
      const wrapper = mount(FormValidationErrorOutput, {
        props: {
          v: {
            $errors: [],
          } as unknown as Validation,
        },
      });
  
      expect(wrapper.find(errorListSelector).exists()).toBe(false);
    });
    it('v - should render with populated error list', () => {
      const wrapper = mount(FormValidationErrorOutput, {
        props: {
          v: {
            $errors: [
              {
                $message: 'error',
              },
            ],
          } as Validation,
        },
      });
  
      expect(wrapper.find(errorListSelector).exists()).toBe(true);
    });
    it('v- should render message from error list', () => {
      const wrapper = mount(FormValidationErrorOutput, {
        props: {
          v: {
            $errors: [
              {
                $message: 'first',
              },
              {
                $message: 'second',
              },
            ],
          } as Validation,
        },
      });
  
      expect(wrapper.find(errorListSelector).text()).toBe('first');
    });
  })
});
