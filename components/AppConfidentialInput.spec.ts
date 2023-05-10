import AppConfidentionalInput from './AppConfidentionalInput.vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

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

describe('AppConfidentionalInput', () => {
  describe('props', () => {
    it('name - should render with set name', () => {
      const wrapper = mount(AppConfidentionalInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('name')).toBe(
        defaultMountOptions.props.name
      );
    });
    it('title - should render with set title', () => {
      const wrapper = mount(AppConfidentionalInput, {
        props: {
          ...defaultMountOptions.props,
        },
      });

      expect(wrapper.get(textInputSelector).attributes('title')).toBe(
        defaultMountOptions.props.title
      );
    });
    it('required - should render with set required attribute', () => {
      const wrapper = mount(AppConfidentionalInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('required')).toBe(
        defaultMountOptions.props.required.toString()
      );
    });
    it('placeholder - should render with set placeholder', () => {
      const wrapper = mount(AppConfidentionalInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('placeholder')).toBe(
        defaultMountOptions.props.placeholder
      );
    });
    it('value - should render with set value', () => {
      const wrapper = mount(AppConfidentionalInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('value')).toBe(
        defaultMountOptions.props.value
      );
    });
    describe('User Interactions', () => {
      it('click - should toggle password visibility (switch input type between password and text)', async () => {
        const wrapper = mount(AppConfidentionalInput);

        expect(wrapper.get(textInputSelector).attributes('type')).toBe(
          'password'
        );

        await wrapper.find('button').trigger('click');
        expect(wrapper.get(textInputSelector).attributes('type')).toBe('text');

        await wrapper.find('button').trigger('click');
        expect(wrapper.get(textInputSelector).attributes('type')).toBe(
          'password'
        );
      });
    });
  });
});
