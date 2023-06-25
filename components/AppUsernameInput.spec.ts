import AppUsernameInput from './AppUsernameInput.vue';
import { describe, expect, it } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';

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
  describe('User Interactions', () => {
    // TODO: find a way to use nuxt autoimported components
    it.todo('input - should emit value', async () => {
      const testValue = 'test';
      const wrapper = mount(AppUsernameInput, defaultMountOptions);

      await wrapper.get(textInputSelector).setValue(testValue);

      expect(wrapper.emitted()).toHaveProperty('updateValue');
      const updateValueEvent = wrapper.emitted('updateValue');
      expect(updateValueEvent).toHaveLength(2);
      expect(updateValueEvent![1]).toEqual([testValue]);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(AppUsernameInput, defaultMountOptions);
    expect(wrapper.get(textInputSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <apptextinput
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
