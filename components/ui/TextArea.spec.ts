import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TextArea from './TextArea.vue';

const textInputSelector = '[data-testid=textArea]';
const titledInputSelector = '[data-testid=input]';

const defaultMountOptions: {
  props: {
    title: string;
    name: string;
    placeholder: string;
  };
} = {
  props: {
    title: 'title',
    name: 'title',
    placeholder: 'placeholder',
  },
};

describe('TextArea', () => {
  it('should render with set name', () => {
    const wrapper = mount(TextArea, defaultMountOptions);

    expect(wrapper.get(textInputSelector).attributes('name')).toBe(
      defaultMountOptions.props.name
    );
  });
  it('should render with set placeholder', () => {
    const wrapper = mount(TextArea, defaultMountOptions);

    expect(wrapper.get(textInputSelector).attributes('placeholder')).toBe(
      defaultMountOptions.props.placeholder
    );
  });
  it('changes color when focused', async () => {
    const wrapper = mount(TextArea, defaultMountOptions);

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
  it('should emit value on input', async () => {
    const testValue = 'test';
    const wrapper = mount(TextArea, defaultMountOptions);
    const input = wrapper.get(textInputSelector);

    await input.setValue(testValue);

    const updateValueEvent = wrapper.emitted('updateValue');

    expect(updateValueEvent).toHaveLength(2);
    expect(updateValueEvent![1]).toEqual([testValue]);
  });
});
