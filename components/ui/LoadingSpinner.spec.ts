import LoadingSpinner from './LoadingSpinner.vue';
import { describe, expect, it } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';

const loadingSpinnerSelector = '[data-testid=loadingSpinner]';

describe('LoadingSpinner', async () => {
  describe('props', () => {
    it('color - should render with white color if not provided', () => {
      const wrapper = shallowMount(LoadingSpinner);

      expect(wrapper.get(loadingSpinnerSelector).classes()).toContain(
        'border-white'
      );
    });
    it('color - should render with set color', () => {
      const wrapper = shallowMount(LoadingSpinner, {
        props: {
          color: 'black',
        },
      });

      expect(wrapper.get(loadingSpinnerSelector).classes()).toContain(
        'border-black'
      );
    });
    it('size - should render with md size if not provided', () => {
      const wrapper = shallowMount(LoadingSpinner);

      expect(wrapper.get(loadingSpinnerSelector).classes()).toContain(
        'w-[20px]'
      );
    });
    it('size - should render with set size', () => {
      const wrapper = shallowMount(LoadingSpinner, {
        props: {
          size: 'sm',
        },
      });

      expect(wrapper.get(loadingSpinnerSelector).classes()).toContain(
        'w-[15px]'
      );
    });
    it('size - should render with set size', () => {
      const wrapper = shallowMount(LoadingSpinner, {
        props: {
          size: 'lg',
        },
      });

      expect(wrapper.get(loadingSpinnerSelector).classes()).toContain(
        'w-[25px]'
      );
    });
    it('size - should render with set size', () => {
      const wrapper = shallowMount(LoadingSpinner, {
        props: {
          size: 'xl',
        },
      });

      expect(wrapper.get(loadingSpinnerSelector).classes()).toContain(
        'w-[40px]'
      );
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(LoadingSpinner);
    expect(wrapper.get(loadingSpinnerSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="spinner border-[2px] aspect-square border-white w-[20px]"
          data-testid="loadingSpinner"
          data-v-78984f6f=""
        />,
      }
    `);
  });
});
