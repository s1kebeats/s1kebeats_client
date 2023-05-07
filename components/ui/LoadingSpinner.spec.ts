import LoadingSpinner from './LoadingSpinner.vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

const loadingSpinnerSelector = '[data-testid=loadingSpinner]';

describe('LoadingSpinner', async () => {
  describe('props', () => {
    it('color - should render with white color if not provided', () => {
      const wrapper = mount(LoadingSpinner);

      expect(wrapper.get(loadingSpinnerSelector).classes()).toContain(
        'border-white'
      );
    });
    it('color - should render with set color', () => {
      const wrapper = mount(LoadingSpinner, {
        props: {
          color: 'black',
        },
      });

      expect(wrapper.get(loadingSpinnerSelector).classes()).toContain(
        'border-black'
      );
    });
    it('size - should render with md size if not provided', () => {
      const wrapper = mount(LoadingSpinner);

      expect(wrapper.get(loadingSpinnerSelector).classes()).toContain(
        'w-[20px]'
      );
    });
    it('size - should render with set size', () => {
      const wrapper = mount(LoadingSpinner, {
        props: {
          size: 'sm',
        },
      });

      expect(wrapper.get(loadingSpinnerSelector).classes()).toContain(
        'w-[15px]'
      );
    });
    it('size - should render with set size', () => {
      const wrapper = mount(LoadingSpinner, {
        props: {
          size: 'lg',
        },
      });

      expect(wrapper.get(loadingSpinnerSelector).classes()).toContain(
        'w-[25px]'
      );
    });
    it('size - should render with set size', () => {
      const wrapper = mount(LoadingSpinner, {
        props: {
          size: 'xl',
        },
      });

      expect(wrapper.get(loadingSpinnerSelector).classes()).toContain(
        'w-[40px]'
      );
    });
  });
});
