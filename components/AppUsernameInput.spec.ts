import AppUsernameInput from './AppUsernameInput.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

const textInputSelector = '[data-testid=textInput]';

const defaultMountOptions = {
  props: {
    title: 'title',
    name: 'testName',
    placeholder: 'placeholder',
    required: true,
    value: 'newVal',
  },
};

describe('AppUsernameInput', () => {
  describe('props', () => {
    it('name - should render with set name', () => {
      const wrapper = shallowMount(AppUsernameInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('name')).toBe(
        defaultMountOptions.props.name
      );
    });
    it('required - should render with set required attribute', () => {
      const wrapper = shallowMount(AppUsernameInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('required')).toBe(
        defaultMountOptions.props.required.toString()
      );
    });
    it('value - should render with set value', () => {
      const wrapper = shallowMount(AppUsernameInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('value')).toBe(
        defaultMountOptions.props.value
      );
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(AppUsernameInput, defaultMountOptions);
    expect(wrapper.get(textInputSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <uitextinput
          data-testid="textInput"
          name="testName"
          placeholder="placeholder"
          required="true"
          title="title"
          type="text"
          value="newVal"
        />,
      }
    `);
  });
});
