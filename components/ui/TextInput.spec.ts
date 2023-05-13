import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import TextInput from './TextInput.vue';

const textInputSelector = '[data-testid=textInput]';
const titledInputSelector = '[data-testid=titledInput]';

const defaultMountOptions = {
  props: {
    title: 'title',
    name: 'title',
    placeholder: 'placeholder',
    required: false,
    value: 'value',
  },
};

describe('TextInput', () => {
  describe('props', () => {
    it('name - should render with set name', () => {
      const wrapper = shallowMount(TextInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('name')).toBe(
        defaultMountOptions.props.name
      );
    });
    it('type - should render with type text when not provided', () => {
      const wrapper = shallowMount(TextInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('type')).toBe('text');
    });
    it('type - should render with set type', () => {
      const wrapper = shallowMount(TextInput, {
        props: {
          ...defaultMountOptions.props,
          type: 'email',
        },
      });

      expect(wrapper.get(textInputSelector).attributes('type')).toBe('email');
    });
    it('title - should render with set title', () => {
      const wrapper = shallowMount(TextInput, {
        props: {
          ...defaultMountOptions.props,
        },
      });

      expect(wrapper.get(titledInputSelector).attributes('title')).toBe(
        defaultMountOptions.props.title
      );
    });
    it('required - should render required icon when set to true', () => {
      const wrapper = shallowMount(TextInput, defaultMountOptions);

      expect(wrapper.get(titledInputSelector).attributes('required')).toBe(
        defaultMountOptions.props.required.toString()
      );
    });
    it('placeholder - should render with set placeholder', () => {
      const wrapper = shallowMount(TextInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('placeholder')).toBe(
        defaultMountOptions.props.placeholder
      );
    });
    it('value - should render with set value', () => {
      const wrapper = shallowMount(TextInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('value')).toBe(
        defaultMountOptions.props.value
      );
    });
  });
  describe('User Interactions', () => {
    it('focus - should render with colored border when focused', async () => {
      const wrapper = shallowMount(TextInput, defaultMountOptions);

      await wrapper.get(textInputSelector).trigger('focus');
      expect(wrapper.get(titledInputSelector).attributes('focused')).toBe(
        'true'
      );
    });
    it('blur - should render with default border when not focused', async () => {
      const wrapper = shallowMount(TextInput, defaultMountOptions);

      await wrapper.get(textInputSelector).trigger('blur');
      expect(wrapper.get(titledInputSelector).attributes('focused')).toBe(
        'false'
      );
    });
    it('input - should emit value', async () => {
      const testValue = 'test';
      const wrapper = shallowMount(TextInput, defaultMountOptions);

      await wrapper.get(textInputSelector).setValue(testValue);

      expect(wrapper.emitted()).toHaveProperty('updateValue');
      const updateValueEvent = wrapper.emitted('updateValue');
      expect(updateValueEvent).toHaveLength(2);
      expect(updateValueEvent![1]).toEqual([testValue]);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(TextInput, defaultMountOptions);
    expect(wrapper.get(titledInputSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <uititledinput
          data-testid="titledInput"
          focused="false"
          name="title"
          required="false"
          title="title"
        >
          <input
            autocomplete="off"
            class="max-w-[calc(100%-16px)] focus:outline-none"
            data-testid="textInput"
            name="title"
            placeholder="placeholder"
            type="text"
          />
          
          
        </uititledinput>,
      }
    `);
  });
});
