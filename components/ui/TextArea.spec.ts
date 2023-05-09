import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TextArea from './TextArea.vue';

const textAreaSelector = '[data-testid=textArea]';
const titledInputSelector = '[data-testid=titledInput]';
const titledInputLabelSelector = '[data-testid=titledInputLabel]';
const titledInputRequiredIconSelector = '[data-testid=titledInputRequiredIcon]';

const defaultMountOptions = {
  props: {
    title: 'title',
    name: 'testName',
    placeholder: 'placeholder',
    required: true,
    resize: false,
  },
};

describe('TextArea', () => {
  describe('props', () => {
    it('name - should render with set name', () => {
      const wrapper = mount(TextArea, defaultMountOptions);

      expect(wrapper.get(textAreaSelector).attributes('name')).toBe(
        defaultMountOptions.props.name
      );
    });
    it('title - should render with set title', () => {
      const wrapper = mount(TextArea, {
        props: {
          ...defaultMountOptions.props,
          required: false,
        },
      });

      expect(wrapper.get(titledInputLabelSelector).text()).toBe(
        defaultMountOptions.props.title
      );
    });
    it('required - should render required icon when set to true', () => {
      const wrapper = mount(TextArea, defaultMountOptions);

      expect(wrapper.find(titledInputRequiredIconSelector).exists()).toBe(true);
    });
    it('placeholder - should render with set placeholder', () => {
      const wrapper = mount(TextArea, defaultMountOptions);

      expect(wrapper.get(textAreaSelector).attributes('placeholder')).toBe(
        defaultMountOptions.props.placeholder
      );
    });
    it('resize - should render without resize-none class when set to true / not provided', () => {
      const wrapper = mount(TextArea, {
        props: {
          ...defaultMountOptions.props,
          resize: true,
        },
      });

      expect(wrapper.get(textAreaSelector).classes()).not.toContain(
        'resize-none'
      );
    });
    it('resize - should render with resize-none class when set to false', () => {
      const wrapper = mount(TextArea, defaultMountOptions);

      expect(wrapper.get(textAreaSelector).classes()).toContain('resize-none');
    });
  });
  describe('User Interactions', () => {
    it('focus - should render with colored border when focused', async () => {
      const wrapper = mount(TextArea, defaultMountOptions);

      await wrapper.get(textAreaSelector).trigger('focus');
      expect(wrapper.get(titledInputSelector).classes()).toContain(
        'border-violet-500'
      );
    });
    it('blur - should render with default border when not focused', async () => {
      const wrapper = mount(TextArea, defaultMountOptions);

      await wrapper.get(textAreaSelector).trigger('blur');
      expect(wrapper.get(titledInputSelector).classes()).not.toContain(
        'border-violet-500'
      );
    });
    it('input - should emit value', async () => {
      const testValue = 'test';
      const wrapper = mount(TextArea, defaultMountOptions);

      await wrapper.get(textAreaSelector).setValue(testValue);

      expect(wrapper.emitted()).toHaveProperty('updateValue');
      const updateValueEvent = wrapper.emitted('updateValue');
      expect(updateValueEvent).toHaveLength(2);
      expect(updateValueEvent![1]).toEqual([testValue]);
    });
  });
});
