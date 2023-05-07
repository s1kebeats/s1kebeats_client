import ApiImage from './AppApiImage.vue';
import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';

const apiImageSelector = '[data-testid=apiImage]';
// TODO: MEDIA_URL from Nuxt runtimeConfig
const MEDIA_URL = 'http://192.168.1.135:5000/api/media/';

describe('ApiImage', () => {
  describe('props', () => {
    it('src - should render with api-based src', () => {
      const testSrc = 'test';
      const wrapper = shallowMount(ApiImage, {
        props: {
          src: testSrc,
        },
        mocks: {
          useRuntimeConfig: () => ({
            public: {
              MEDIA_URL,
            },
          }),
        },
      });

      expect(wrapper.get(apiImageSelector).attributes('src')).toBe(
        MEDIA_URL + testSrc
      );
    });
  });
});
