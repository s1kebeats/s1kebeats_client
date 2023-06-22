import { mount, shallowMount } from '@vue/test-utils';
import AppDebouncedTextInput from './AppDebouncedTextInput.vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const defaultMountOptions = {
  props: {
    name: 'name',
    title: 'title',
    placeholder: 'placeholder',
    type: 'email',
    required: true,
    value: 'value',
  },
};
const textInputSelector = '[data-testid=textInput]';

describe('AppDebouncedTextInput', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  describe('props', () => {
    it('name - should render with set name', () => {
      const wrapper = shallowMount(AppDebouncedTextInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('name')).toBe(
        defaultMountOptions.props.name
      );
    });
    it('title - should render with set title', () => {
      const wrapper = shallowMount(AppDebouncedTextInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('title')).toBe(
        defaultMountOptions.props.title
      );
    });
    it('placeholder - should render with set placeholder', () => {
      const wrapper = shallowMount(AppDebouncedTextInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('placeholder')).toBe(
        defaultMountOptions.props.placeholder
      );
    });
    it('type - should render with set type', () => {
      const wrapper = shallowMount(AppDebouncedTextInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('type')).toBe(
        defaultMountOptions.props.type
      );
    });
    it('required - should render with set required attribute', () => {
      const wrapper = shallowMount(AppDebouncedTextInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('required')).toBe(
        defaultMountOptions.props.required.toString()
      );
    });
    it('value - should render with set value', () => {
      const wrapper = shallowMount(AppDebouncedTextInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('value')).toBe(
        defaultMountOptions.props.value
      );
    });
  });
  describe('User Interactions', () => {
    // TODO: not working because of nuxt auto imports
    it.todo('input - should emit new value with debounce', async () => {
      const wrapper = mount(AppDebouncedTextInput, defaultMountOptions);
      await wrapper.get(textInputSelector).setValue('1');
      await wrapper.get(textInputSelector).setValue('2');
      await wrapper.get(textInputSelector).setValue('3');
      vi.runAllTimers();
      const updateValueEvent = wrapper.emitted('updateValue');
      expect(updateValueEvent).toHaveLength(1);
      expect(updateValueEvent![0]).toEqual([3]);
    });
  });
});
