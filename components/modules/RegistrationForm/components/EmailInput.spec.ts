import EmailInput from './EmailInput.vue';
import { mount, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

const defaultMountOptions = {
  props: {
    value: 'email@email.com',
    required: true,
    name: 'testName',
  },
};
const textInputSelector = '[data-testid=textInput]';

describe('EmailInput', () => {
  describe('props', () => {
    it('name - should render with set name', () => {
      const wrapper = shallowMount(EmailInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('name')).toBe(
        defaultMountOptions.props.name
      );
    });
    it('required - should render with set required attribute', () => {
      const wrapper = shallowMount(EmailInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('required')).toBe(
        defaultMountOptions.props.required.toString()
      );
    });
    it('value - should render with set value', () => {
      const wrapper = shallowMount(EmailInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('value')).toBe(
        defaultMountOptions.props.value
      );
    });
  });
  describe('User Interactions', () => {
    // TODO: find a way to use nuxt autoimported components
    it.todo('input - should emit value', async () => {
      const testValue = 'test';
      const wrapper = mount(EmailInput, defaultMountOptions);

      await wrapper.get(textInputSelector).setValue(testValue);

      expect(wrapper.emitted()).toHaveProperty('updateValue');
      const updateValueEvent = wrapper.emitted('updateValue');
      expect(updateValueEvent).toHaveLength(2);
      expect(updateValueEvent![1]).toEqual([testValue]);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(EmailInput, defaultMountOptions);
    expect(wrapper.get(textInputSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <appdebouncedtextinput
          data-testid="textInput"
          name="testName"
          placeholder="Введите электронную почту"
          required="true"
          title="Электронная почта"
          type="email"
          value="email@email.com"
        />,
      }
    `);
  });
});
