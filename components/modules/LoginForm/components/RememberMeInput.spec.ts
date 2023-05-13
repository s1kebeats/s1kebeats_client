import { mount, shallowMount } from '@vue/test-utils';
import RememberMeInput from './RememberMeInput.vue';
import { describe, it, expect, vi } from 'vitest';
import UiCheckboxInput from '@/components/ui/CheckboxInput.vue';

const checkboxInputSelector = '[data-testid=checkboxInput]';

vi.stubGlobal('UiCheckboxInput', () => UiCheckboxInput);

describe('RememberMeInput', () => {
  describe('props', () => {
    it('value - should render with set value', () => {
      const wrapper = shallowMount(RememberMeInput, {
        props: {
          value: true,
        },
      });
      expect(wrapper.get(checkboxInputSelector).attributes('value')).toBe(
        'true'
      );
    });
  });
  describe('User Interactions', () => {
    it('click - should emit new value', async () => {
      const wrapper = mount(RememberMeInput, {
        props: {
          value: false,
        },
      });
      await wrapper.get(checkboxInputSelector).trigger('click');

      expect(wrapper.emitted()).toHaveProperty('updateValue');
      const updateValueEvent = wrapper.emitted('updateValue');
      expect(updateValueEvent).toHaveLength(1);
      expect(updateValueEvent![0]).toEqual([true]);
    });
  });
});
