import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import NumberInput from './NumberInput.vue';

const numberInputSelector = '[data-testid=numberInput]';
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

describe('NumberInput', () => {
  it('should render with set name', () => {
    const wrapper = mount(NumberInput, defaultMountOptions);

    expect(wrapper.get(numberInputSelector).attributes('name')).toBe(
      defaultMountOptions.props.name
    );
  });
  it('should render with set placeholder', () => {
    const wrapper = mount(NumberInput, defaultMountOptions);

    expect(wrapper.get(numberInputSelector).attributes('placeholder')).toBe(
      defaultMountOptions.props.placeholder
    );
  });
  it('changes color when focused', async () => {
    const wrapper = mount(NumberInput, defaultMountOptions);

    expect(wrapper.get(titledInputSelector).classes()).not.toContain(
      'border-violet-500'
    );

    await wrapper.get(numberInputSelector).trigger('focus');
    expect(wrapper.get(titledInputSelector).classes()).toContain(
      'border-violet-500'
    );

    await wrapper.get(numberInputSelector).trigger('blur');
    expect(wrapper.get(titledInputSelector).classes()).not.toContain(
      'border-violet-500'
    );
  });
  it('replaces non-digit value', async () => {
    const wrapper = mount(NumberInput, defaultMountOptions);

    await wrapper.get(numberInputSelector).setValue('5df3');

    expect(wrapper.get(numberInputSelector).element.value).toBe('53');
  });
  it('should emit numeric value', async () => {
    const wrapper = mount(NumberInput, defaultMountOptions);

    await wrapper.get(numberInputSelector).setValue('5df3');

    expect(wrapper.emitted()).toHaveProperty('updateValue');

    const updateValueEvent = wrapper.emitted('updateValue');

    expect(updateValueEvent).toHaveLength(2);
    expect(updateValueEvent![1]).toEqual([53]);
  });
});
