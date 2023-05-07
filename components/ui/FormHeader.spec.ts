import { describe, expect, it } from 'vitest';
import FormHeader from './FormHeader.vue';
import { mount } from '@vue/test-utils';

const formTitleSelector = '[data-testid=title]';

describe('FormHeader', async () => {
  describe('props', () => {
    it('title - should render with set title', () => {
      const testTitle = 'title';
      const wrapper = mount(FormHeader, {
        props: {
          title: testTitle,
        },
      });
      expect(wrapper.get(formTitleSelector).text()).toBe(testTitle);
    });
  })
});
