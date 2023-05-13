import ApiImage from './AppApiImage.vue';
import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { runtimeConfigMock } from '@/stores/api/mocks';

const apiImageSelector = '[data-testid=apiImage]';

vi.stubGlobal('useRuntimeConfig', () => runtimeConfigMock);

describe('ApiImage', () => {
  describe('props', () => {
    it('src - should render with api-based src', () => {
      const testSrc = 'test';
      const wrapper = shallowMount(ApiImage, {
        props: {
          src: testSrc,
        },
      });

      expect(wrapper.get(apiImageSelector).attributes('src')).toBe(
        runtimeConfigMock.public.MEDIA_URL + testSrc
      );
    });
  });
  it('shapshot - should match the snapshot', () => {
    const wrapper = shallowMount(ApiImage, {
      props: {
        src: 'src',
      },
    });
    expect(wrapper.get(apiImageSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <img
          class="object-cover"
          data-testid="apiImage"
          src="http://192.168.1.135:5000/api/media/src"
        />,
      }
    `);
  });
});
