import { describe, expect, it } from 'vitest';
import CheckboxInput from './CheckboxInput.vue';
import { shallowMount } from '@vue/test-utils';

const checkboxSelector = '[data-testid=checkbox]';
const checkboxIndicatorSelector = '[data-testid=chekboxIndicator]';

const defaultMountOptions = {
  props: {
    name: 'test',
    value: true,
  },
};

describe('CheckboxInput', async () => {
  describe('props', () => {
    it('name - should render with set name attribute', () => {
      const wrapper = shallowMount(CheckboxInput, defaultMountOptions);
      const attributes = wrapper.attributes();

      expect(attributes.name).toBe(defaultMountOptions.props.name);
    });
    it('value - should render checkbox indicator when set to true; set aria-checked attribute', () => {
      const wrapper = shallowMount(CheckboxInput, defaultMountOptions);
      const attributes = wrapper.attributes();

      expect(attributes['aria-checked']).toBe(
        defaultMountOptions.props.value.toString()
      );
      expect(wrapper.get(checkboxIndicatorSelector).isVisible()).toBe(
        defaultMountOptions.props.value
      );
    });
    it('value - should not render checkbox indicator when set to false; set aria-checked attribute', () => {
      const wrapper = shallowMount(CheckboxInput, {
        props: {
          ...defaultMountOptions.props,
          value: false,
        },
      });
      const attributes = wrapper.attributes();

      expect(attributes['aria-checked']).toBe('false');
      expect(wrapper.get(checkboxIndicatorSelector).isVisible()).toBe(false);
    });
  });
  describe('User Interactions', () => {
    it('click - should emit opposite value', async () => {
      const wrapper = shallowMount(CheckboxInput, defaultMountOptions);

      await wrapper.get(checkboxSelector).trigger('click');
      expect(wrapper.emitted()).toHaveProperty('updateValue');

      const updateValueEvent = wrapper.emitted('updateValue');

      expect(updateValueEvent).toHaveLength(1);
      expect(updateValueEvent![0]).toEqual([!defaultMountOptions.props.value]);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(CheckboxInput, defaultMountOptions);
    expect(wrapper.get(checkboxSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          aria-checked="true"
          class="cursor-pointer flex items-center justify-center w-[15px] h-[15px] rounded-full border-[1px] focus:border-black focus:outline-none"
          data-testid="checkbox"
          name="test"
          role="checkbox"
          tabindex="0"
        >
          <div
            class="w-[11px] h-[11px] rounded-full bg-[#7945fc]"
            data-testid="chekboxIndicator"
          />
        </div>,
      }
    `);
  });
});
