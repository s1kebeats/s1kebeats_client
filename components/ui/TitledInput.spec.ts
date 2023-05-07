import TitledInput from './TitledInput.vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';

const inputSelector = '[data-testid=input]';
const titleSelector = '[data-testid=title]';

describe('TitledInput', () => {
  it('should render with set title', () => {
    const testTitle = 'title';

    const wrapper = mount(TitledInput, {
      props: {
        title: testTitle,
        focused: false,
      },
    });

    expect(wrapper.get(titleSelector).text()).toBe(testTitle);
  });
  it('should render with default border with "focused" = "false"', () => {
    const testTitle = 'title';

    const wrapper = mount(TitledInput, {
      props: {
        title: testTitle,
        focused: false,
      },
    });

    expect(wrapper.get(inputSelector).classes()).not.toContain(
      'border-violet-500'
    );
  });
  it('should render with colored border with "focused" = "true"', () => {
    const testTitle = 'title';

    const wrapper = mount(TitledInput, {
      props: {
        title: testTitle,
        focused: true,
      },
    });

    expect(wrapper.get(inputSelector).classes()).toContain('border-violet-500');
  });
});
