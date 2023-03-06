import AppConfidentionalInput from './AppConfidentionalInput.vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

const textInputSelector = '[data-testid=textInput]';

describe('AppConfidentionalInput', () => {
  it('toggles password visibility', async () => {
    const wrapper = mount(AppConfidentionalInput);
    const textInput = wrapper.get(textInputSelector);

    expect(textInput.attributes('type')).toBe('password');

    await wrapper.find('button').trigger('click');
    expect(textInput.attributes('type')).toBe('text');

    await wrapper.find('button').trigger('click');
    expect(textInput.attributes('type')).toBe('password');
  });
});
