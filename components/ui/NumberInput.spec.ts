import { describe, it, expect } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import NumberInput from './NumberInput.vue';

const numberInputSelector = '[data-testid=numberInput]';
const titledInputSelector = '[data-testid=titledInput]';

const defaultMountOptions = {
  props: {
    title: 'title',
    name: 'testName',
    placeholder: 'placeholder',
    required: true,
    resize: false,
    value: 999,
  },
};

describe('NumberInput', () => {
  describe('props', () => {
    it('name - should render with set name', () => {
      const wrapper = shallowMount(NumberInput, defaultMountOptions);

      expect(wrapper.get(numberInputSelector).attributes('name')).toBe(
        defaultMountOptions.props.name
      );
    });
    it('title - should render with set title', () => {
      const wrapper = shallowMount(NumberInput, {
        props: {
          ...defaultMountOptions.props,
          required: false,
        },
      });

      expect(wrapper.get(titledInputSelector).attributes('title')).toBe(
        defaultMountOptions.props.title
      );
    });
    it('required - should render required icon when set to true', () => {
      const wrapper = shallowMount(NumberInput, defaultMountOptions);

      expect(wrapper.get(titledInputSelector).attributes('required')).toBe(
        defaultMountOptions.props.required.toString()
      );
    });
    it('placeholder - should render with set placeholder', () => {
      const wrapper = shallowMount(NumberInput, defaultMountOptions);

      expect(wrapper.get(numberInputSelector).attributes('placeholder')).toBe(
        defaultMountOptions.props.placeholder
      );
    });
    it('value - should render with set value', () => {
      const wrapper = shallowMount(NumberInput, defaultMountOptions);

      expect(wrapper.get(numberInputSelector).attributes('value')).toBe(
        defaultMountOptions.props.value
      );
    });
  });
  describe('User Interactions', () => {
    it('focus - should render with colored border when focused', async () => {
      const wrapper = shallowMount(NumberInput, defaultMountOptions);

      await wrapper.get(numberInputSelector).trigger('focus');
      expect(wrapper.get(titledInputSelector).attributes('focused')).toBe(
        'true'
      );
    });
    it('blur - should render with default border when not focused', async () => {
      const wrapper = shallowMount(NumberInput, defaultMountOptions);

      await wrapper.get(numberInputSelector).trigger('blur');
      expect(wrapper.get(titledInputSelector).attributes('focused')).toBe(
        'false'
      );
    });
    it('input - should filter non-digit chars and emit filtered value', async () => {
      const wrapper = shallowMount(NumberInput, defaultMountOptions);

      await wrapper.get(numberInputSelector).setValue('5df3');

      expect(wrapper.emitted()).toHaveProperty('updateValue');
      const updateValueEvent = wrapper.emitted('updateValue');
      expect(updateValueEvent).toHaveLength(2);
      expect(updateValueEvent![1]).toEqual([53]);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(NumberInput, defaultMountOptions);
    expect(wrapper.get(titledInputSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <uititledinput
          data-testid="titledInput"
          focused="false"
          name="testName"
          required="true"
          resize="false"
          title="title"
        >
          <input
            autocomplete="off"
            class="max-w-[calc(100%-16px)] focus:outline-none"
            data-testid="numberInput"
            name="testName"
            placeholder="placeholder"
            type="text"
          />
          
          
        </uititledinput>,
      }
    `);
  });
});
