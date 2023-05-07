import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LoadingScreen from './LoadingScreen.vue';

const loadingScreenSelector = '[data-testid=loadingScreen]';

describe('LoadingScreen', () => {
  describe('props', () => {
    it('loading - should be invisible when set to false', () => {
      const wrapper = shallowMount(LoadingScreen, {
        props: {
          loading: false,
        },
      });

      expect(wrapper.get(loadingScreenSelector).isVisible()).toBe(false);
    });
    it('loading - should be visible when set to true', () => {
      const wrapper = shallowMount(LoadingScreen, {
        props: {
          loading: true,
        },
      });

      expect(wrapper.get(loadingScreenSelector).isVisible()).toBe(true);
    });
  });
});
