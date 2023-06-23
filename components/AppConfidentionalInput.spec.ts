import AppConfidentionalInput from './AppConfidentionalInput.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount, mount } from '@vue/test-utils';

const textInputSelector = '[data-testid=textInput]';
const visibilityIconSelector = '[data-testid=visibilityIcon]';

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
      const wrapper = shallowMount(AppConfidentionalInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('name')).toBe(
        defaultMountOptions.props.name
      );
    });
    it('title - should render with set title', () => {
      const wrapper = shallowMount(AppConfidentionalInput, {
        props: {
          ...defaultMountOptions.props,
        },
      });

      expect(wrapper.get(textInputSelector).attributes('title')).toBe(
        defaultMountOptions.props.title
      );
    });
    it('required - should render with set required attribute', () => {
      const wrapper = shallowMount(AppConfidentionalInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('required')).toBe(
        defaultMountOptions.props.required.toString()
      );
    });
    it('placeholder - should render with set placeholder', () => {
      const wrapper = shallowMount(AppConfidentionalInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('placeholder')).toBe(
        defaultMountOptions.props.placeholder
      );
    });
    it('value - should render with set value', () => {
      const wrapper = shallowMount(AppConfidentionalInput, defaultMountOptions);

      expect(wrapper.get(textInputSelector).attributes('value')).toBe(
        defaultMountOptions.props.value
      );
    });
    describe('User Interactions', () => {
      it('click - should toggle password visibility (switch input type between password and text)', async () => {
        const wrapper = shallowMount(AppConfidentionalInput);

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
      it('click - should toggle visibility icon', async () => {
        const wrapper = shallowMount(AppConfidentionalInput);

        expect(wrapper.get(visibilityIconSelector).attributes('name')).toBe(
          'material-symbols:visibility-off-outline-rounded'
        );

        await wrapper.find('button').trigger('click');
        expect(wrapper.get(visibilityIconSelector).attributes('name')).toBe(
          'material-symbols:visibility-outline-rounded'
        );

        await wrapper.find('button').trigger('click');
        expect(wrapper.get(visibilityIconSelector).attributes('name')).toBe(
          'material-symbols:visibility-off-outline-rounded'
        );
      });
      // TODO: find a way to use nuxt autoimported components
      it.todo('input - should emit value', async () => {
        const testValue = 'test';
        const wrapper = mount(AppConfidentionalInput, defaultMountOptions);

        await wrapper.get(textInputSelector).setValue(testValue);

        expect(wrapper.emitted()).toHaveProperty('updateValue');
        const updateValueEvent = wrapper.emitted('updateValue');
        expect(updateValueEvent).toHaveLength(2);
        expect(updateValueEvent![1]).toEqual([testValue]);
      });
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(AppConfidentionalInput, defaultMountOptions);
    expect(wrapper.get(textInputSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <apptextinput
          data-testid="textInput"
          name="testName"
          placeholder="placeholder"
          required="true"
          title="title"
          type="password"
          value="newVal"
        >
          <button
            class="flex w-4"
          >
            <icon
              class="m-auto"
              data-testid="visibilityIcon"
              name="material-symbols:visibility-off-outline-rounded"
              size="16px"
            />
          </button>
        </apptextinput>,
      }
    `);
  });
});
