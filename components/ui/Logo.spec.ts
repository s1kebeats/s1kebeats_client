import Logo from './Logo.vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

const logoSelector = '[data-testid=logoSvgPath]';

describe('Logo', () => {
  describe('props', () => {
    it('color - should render black on default', () => {
      const wrapper = mount(Logo);

      expect(wrapper.get(logoSelector).attributes('fill')).toBe('black');
    });
    it('color - should render with set color', () => {
      const testColor = '#7945fc';

      const wrapper = mount(Logo, {
        props: {
          color: testColor,
        },
      });

      expect(wrapper.get(logoSelector).attributes('fill')).toBe(testColor);
    });
  });
});
