import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TextInput from './TextInput.vue';

const textInputSelector = '[data-testid=textInput]';
const titledInputSelector = '[data-testid=input]';

const defaultMountOptions: {
  props: {
    title: string;
    name: string;
    placeholder: string;
    type: 'text' | 'email' | 'password';
  };
} = {
  props: {
    title: 'title',
    name: 'title',
    placeholder: 'placeholder',
    type: 'text',
  },
};

describe('TextInput', () => {
  it('renders with set type', () => {
    const wrapper = mount(TextInput, defaultMountOptions);

    expect(wrapper.get(textInputSelector).attributes('type')).toBe(
      defaultMountOptions.props.type
    );
  });
  it('renders with set name', () => {
    const wrapper = mount(TextInput, defaultMountOptions);

    expect(wrapper.get(textInputSelector).attributes('name')).toBe(
      defaultMountOptions.props.name
    );
  });
  it('renders with set placeholder', () => {
    const wrapper = mount(TextInput, defaultMountOptions);

    expect(wrapper.get(textInputSelector).attributes('placeholder')).toBe(
      defaultMountOptions.props.placeholder
    );
  });
  it('changes color when focused', async () => {
    const wrapper = mount(TextInput, defaultMountOptions);

    expect(wrapper.get(titledInputSelector).classes()).not.toContain(
      'border-violet-500'
    );

    await wrapper.get(textInputSelector).trigger('focus');
    expect(wrapper.get(titledInputSelector).classes()).toContain(
      'border-violet-500'
    );

    await wrapper.get(textInputSelector).trigger('blur');
    expect(wrapper.get(titledInputSelector).classes()).not.toContain(
      'border-violet-500'
    );
  });
  it('emits value on input', async () => {
    const testValue = 'test';
    const wrapper = mount(TextInput, defaultMountOptions);
    const input = wrapper.get(textInputSelector);

    await input.setValue(testValue);

    const updateValueEvent = wrapper.emitted('updateValue');

    expect(updateValueEvent).toHaveLength(2);
    expect(updateValueEvent![1]).toEqual([testValue]);
  });
});
