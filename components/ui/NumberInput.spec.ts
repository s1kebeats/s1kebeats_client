import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NumberInput from './NumberInput.vue';

const numberInputSelector = '[data-testid=numberInput]';
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

describe('NumberInput', () => {
  describe('props', () => {
    it('name - should render with set name', () => {
      const wrapper = mount(NumberInput, defaultMountOptions);

      expect(wrapper.get(numberInputSelector).attributes('name')).toBe(
        defaultMountOptions.props.name
      );
    });
    it('title - should render with set title', () => {
      const wrapper = mount(NumberInput, {
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
      const wrapper = mount(NumberInput, defaultMountOptions);

      expect(wrapper.find(titledInputRequiredIconSelector).exists()).toBe(true);
    });
    it('placeholder - should render with set placeholder', () => {
      const wrapper = mount(NumberInput, defaultMountOptions);

      expect(wrapper.get(numberInputSelector).attributes('placeholder')).toBe(
        defaultMountOptions.props.placeholder
      );
    });
  });
  describe('User Interactions', () => {
    it('focus - should render with colored border when focused', async () => {
      const wrapper = mount(NumberInput, defaultMountOptions);

      await wrapper.get(numberInputSelector).trigger('focus');
      expect(wrapper.get(titledInputSelector).classes()).toContain(
        'border-violet-500'
      );
    });
    it('blur - should render with default border when not focused', async () => {
      const wrapper = mount(NumberInput, defaultMountOptions);

      await wrapper.get(numberInputSelector).trigger('blur');
      expect(wrapper.get(titledInputSelector).classes()).not.toContain(
        'border-violet-500'
      );
    });
    it('input - should filter non-digit chars and emit filtered value', async () => {
      const wrapper = mount(NumberInput, defaultMountOptions);

      await wrapper.get(numberInputSelector).setValue('5df3');

      expect(wrapper.emitted()).toHaveProperty('updateValue');
      const updateValueEvent = wrapper.emitted('updateValue');
      expect(updateValueEvent).toHaveLength(2);
      expect(updateValueEvent![1]).toEqual([53]);
    });
  });
});
