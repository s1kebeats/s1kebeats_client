import { describe, expect, it } from 'vitest';
import FormValidationErrorOutput from './FormValidationErrorOutput.vue';
import { mount, shallowMount } from '@vue/test-utils';
import { type Validation } from '@vuelidate/core';

const formValidationErrorOutputSelector =
  '[data-testid=formValidationErrorOutput]';

describe('FormValidationErrorOutput', async () => {
  describe('props', () => {
    it('v - should not render with empty error list', () => {
      const wrapper = shallowMount(FormValidationErrorOutput, {
        props: {
          v: {
            $errors: [],
          } as unknown as Validation,
        },
      });

      expect(wrapper.find(formValidationErrorOutputSelector).exists()).toBe(
        false
      );
    });
    it('v - should render with populated error list', () => {
      const wrapper = shallowMount(FormValidationErrorOutput, {
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

      expect(wrapper.find(formValidationErrorOutputSelector).exists()).toBe(
        true
      );
    });
    it('v - should render message from error list', () => {
      const wrapper = shallowMount(FormValidationErrorOutput, {
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

      expect(wrapper.find(formValidationErrorOutputSelector).text()).toBe(
        'first'
      );
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(FormValidationErrorOutput, {
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
        } as unknown as Validation,
      },
    });
    expect(wrapper.get(formValidationErrorOutputSelector))
      .toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <span
          class="text-xs text-red-500"
          data-testid="formValidationErrorOutput"
        >
          first
        </span>,
      }
    `);
  });
});
