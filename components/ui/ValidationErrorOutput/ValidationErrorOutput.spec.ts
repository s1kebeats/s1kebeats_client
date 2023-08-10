import { describe, expect, it } from 'vitest';
import ValidationErrorOutput from './ValidationErrorOutput.vue';
import { shallowMount } from '@vue/test-utils';
import { type ErrorObject } from '@vuelidate/core';

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
          errors: [
            {
              $message: 'error',
            } as ErrorObject,
          ],
        },
      });

      expect(wrapper.find(validationErrorOutputSelector).exists()).toBe(true);
    });
    it('errors - should render first error message from error list', () => {
      const wrapper = shallowMount(ValidationErrorOutput, {
        props: {
          errors: [
            {
              $message: 'first',
            } as ErrorObject,
            {
              $message: 'second',
            } as ErrorObject,
          ],
        },
      });

      expect(wrapper.find(validationErrorOutputSelector).text()).toBe('first');
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(ValidationErrorOutput, {
      props: {
        errors: [
          {
            $message: 'first',
          } as ErrorObject,
          {
            $message: 'second',
          } as ErrorObject,
        ],
      },
    });
    expect(wrapper.element).toMatchInlineSnapshot(`
      <div
        class="h-[17px] flex items-center"
      >
        <span
          class="text-sm text-danger truncate"
          data-testid="validationErrorOutput"
        >
          first
        </span>
      </div>
    `);
  });
});
