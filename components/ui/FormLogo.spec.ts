import { describe, expect, it } from 'vitest';
import FormLogo from './FormLogo.vue';
import { mount } from '@vue/test-utils';

const formTitleSelector = '[data-testid=title]';

describe('FormLogo', async () => {
  it('renders with title', () => {
    const testTitle = 'title';

    const wrapper = mount(FormLogo, {
      props: {
        title: testTitle,
      },
    });

    expect(wrapper.get(formTitleSelector).text()).toBe(testTitle);
  });
});
