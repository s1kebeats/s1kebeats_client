import { describe, expect, it } from 'vitest';
import CheckboxInput from './CheckboxInput.vue';
import { mount } from '@vue/test-utils';

const checkboxSelector = '[data-testid=checkbox]';
const checkboxIndicatorSelector = '[data-testid=chekboxIndicator]';

describe('CheckboxInput', async () => {
  it('renders without indicator visible on default', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        name: 'test',
      },
    });

    expect(wrapper.get(checkboxIndicatorSelector).isVisible()).toBe(false);
  });
  it('renders with passed name attribute', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        name: 'test',
      },
    });
    const attributes = wrapper.attributes();

    expect(attributes.name).toBe('test');
  });
  it('renders with aria-checked attribute = "false" on default', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        name: 'test',
      },
    });
    const attributes = wrapper.attributes();

    expect(attributes['aria-checked']).toBe('false');
  });
  it('renders with indicator visible with "checked" prop set to true', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        name: 'test',
        checked: true,
      },
    });

    expect(wrapper.get(checkboxIndicatorSelector).isVisible()).toBe(true);
  });
  it('renders with aria-checked attribute = "true" with "checked" prop set to true', () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        name: 'test',
        checked: true,
      },
    });
    const attributes = wrapper.attributes();

    expect(attributes['aria-checked']).toBe('true');
  });
  it('emits value on click', async () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        name: 'test',
      },
    });

    await wrapper.get(checkboxSelector).trigger('click');
    expect(wrapper.emitted()).toHaveProperty('updateValue');

    const updateValueEvent = wrapper.emitted('updateValue');

    expect(updateValueEvent).toHaveLength(1);
    expect(updateValueEvent![0]).toEqual([true]);

    await wrapper.get(checkboxSelector).trigger('click');
    expect(updateValueEvent).toHaveLength(2);
    expect(updateValueEvent![1]).toEqual([false]);
  });
  it('changes checkbox indicator visibility on click', async () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        name: 'test',
      },
    });

    expect(wrapper.get(checkboxIndicatorSelector).isVisible()).toBe(false);

    await wrapper.get(checkboxSelector).trigger('click');
    expect(wrapper.get(checkboxIndicatorSelector).isVisible()).toBe(true);

    await wrapper.get(checkboxSelector).trigger('click');
    expect(wrapper.get(checkboxIndicatorSelector).isVisible()).toBe(false);
  });
  it('changes aria-checked attribute on click', async () => {
    const wrapper = mount(CheckboxInput, {
      props: {
        name: 'test',
      },
    });
    const attributes = wrapper.attributes();

    expect(attributes['aria-checked']).toBe('false');

    await wrapper.get(checkboxSelector).trigger('click');
    expect(attributes['aria-checked']).toBe('true');

    await wrapper.get(checkboxSelector).trigger('click');
    expect(attributes['aria-checked']).toBe('false');
  });
});
