import { describe, expect, it } from 'vitest';
import FormValidationErrorOutput from './FormValidationErrorOutput.vue';
import { mount } from '@vue/test-utils';
import { type Validation } from '@vuelidate/core';

const errorListSelector = '[data-testid=errorList]';

describe('FormValidationErrorOutput', async () => {
  it('should render invisible without error list', () => {
    const wrapper = mount(FormValidationErrorOutput, {
      props: {
        v: {
          $errors: [],
        } as unknown as Validation,
      },
    });

    expect(wrapper.find(errorListSelector).exists()).toBe(false);
  });
  it('should render visible with error list', () => {
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
  it('should render first error message', () => {
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
});
