import ApiImage from './ApiImage.vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

const apiImageSelector = '[data-testid=apiImage]';

describe('ApiImage', () => {
  it('renders with api-based src', () => {
    const testSrc = 'test';
    const wrapper = mount(ApiImage, {
      props: {
        src: testSrc,
      },
    });

    expect(wrapper.get(apiImageSelector).attributes('src')).toBe(
      `http://localhost:5000/api/media/${testSrc}`
    );
  });
});
