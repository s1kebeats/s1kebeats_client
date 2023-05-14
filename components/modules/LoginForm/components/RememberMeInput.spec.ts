// @vitest-environment nuxt
import { mount, shallowMount } from '@vue/test-utils';
import RememberMeInput from './RememberMeInput.vue';
import { describe, it, expect } from 'vitest';

const checkboxInputSelector = '[data-testid=checkboxInput]';
const rememberMeInputSelector = '[data-testid=rememberMeInput]';

describe('RememberMeInput', () => {
  describe('props', () => {
    it('value - should render with set value', () => {
      const wrapper = shallowMount(RememberMeInput, {
        props: {
          value: true,
        },
      });
      expect(wrapper.get(checkboxInputSelector).attributes('value')).toBe(
        'true'
      );
    });
  });
  describe('User Interactions', () => {
    it('click - should emit new value', async () => {
      const wrapper = mount(RememberMeInput, {
        props: {
          value: false,
        },
      });
      await wrapper.get(checkboxInputSelector).trigger('click');

      expect(wrapper.emitted()).toHaveProperty('updateValue');
      const updateValueEvent = wrapper.emitted('updateValue');
      expect(updateValueEvent).toHaveLength(1);
      expect(updateValueEvent![0]).toEqual([true]);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(RememberMeInput, {
      props: {
        value: true,
      },
    });
    expect(wrapper.get(rememberMeInputSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="grow flex items-center justify-end gap-2"
          data-testid="rememberMeInput"
        >
          <label
            class="text-xs"
            for="rememberMe"
          >
            Сохранить вход?
          </label>
          <uicheckboxinput
            data-testid="checkboxInput"
            name="rememberMe"
            value="true"
          />
        </div>,
      }
    `);
  });
});
