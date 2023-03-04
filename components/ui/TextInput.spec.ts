import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TextInput from './TextInput.vue';

const textInputSelector = '[data-testid=textInput]';

const defaultMountOptions: {
  props: {
    title: string;
    name: string;
    placeholder: string;
    type: 'text' | 'email' | 'password';
  }
} = {
  props: {
    title: 'test',
    name: 'test',
    placeholder: 'test',
    type: 'text'
  }
}

describe('TextInput', () => {
  it('renders with set type', () => {
    const wrapper = mount(TextInput, defaultMountOptions)

    expect(wrapper.get(textInputSelector).attributes('type')).toBe(defaultMountOptions.props.type)
  });
  it('renders with set name', () => {
    const wrapper = mount(TextInput, defaultMountOptions)

    expect(wrapper.get(textInputSelector).attributes('name')).toBe(defaultMountOptions.props.name)
  });
  it('renders with set placeholder', () => {
    const wrapper = mount(TextInput, defaultMountOptions)

    expect(wrapper.get(textInputSelector).attributes('placeholder')).toBe(defaultMountOptions.props.placeholder)
  });
});
