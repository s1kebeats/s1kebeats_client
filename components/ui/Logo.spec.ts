import Logo from './Logo.vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

const logoSelector = '[data-testid=logo]';

describe('Logo', () => {
  it('renders black on default', () => {
    const wrapper = mount(Logo);

    expect(wrapper.get(logoSelector).attributes('fill')).toBe('black');
  });
  it('renders with set color', () => {
    const testColor = 'red';

    const wrapper = mount(Logo, {
      props: {
        color: testColor,
      },
    });

    expect(wrapper.get(logoSelector).attributes('fill')).toBe(testColor);
  });
});
