import UploadVersionCard from './UploadVersionCard.vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

const apiImageSelector = '[data-testid=apiImage]';

describe('UploadVersionCard', () => {
  it('renders with api-based src', () => {
    const testSrc = 'test';
    const wrapper = mount(UploadVersionCard, {
      props: {
        src: testSrc,
        icon: '',
        description: '',
        title: '',
        selected: false,
      },
    });

    expect(wrapper.get(apiImageSelector).attributes('src')).toBe(
      `http://localhost:5000/api/media/${testSrc}`
    );
  });
});
