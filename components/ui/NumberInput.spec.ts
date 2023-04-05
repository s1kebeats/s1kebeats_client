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
  it('replaces non-digit value', async () => {
    const wrapper = mount(NumberInput, defaultMountOptions);

    await wrapper.get(numberInputSelector).setValue('5df3');

    expect(wrapper.get(numberInputSelector).element.value).toBe('53');
  });
  it('emits numeric value', async () => {
    const wrapper = mount(NumberInput, defaultMountOptions);

    await wrapper.get(numberInputSelector).setValue('5df3');

    expect(wrapper.emitted()).toHaveProperty('updateValue');

    const updateValueEvent = wrapper.emitted('updateValue');

    expect(updateValueEvent).toHaveLength(2);
    expect(updateValueEvent![0]).toEqual([53]);
  });
});
