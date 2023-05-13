import { describe, expect, it } from 'vitest';
import FormHeader from './FormHeader.vue';
import { mount, shallowMount } from '@vue/test-utils';

const formHeaderSelector = '[data-testid=formHeader]';

describe('FormHeader', async () => {
  describe('props', () => {
    it('title - should render with set title', () => {
      const testTitle = 'title';
      const wrapper = shallowMount(FormHeader, {
        props: {
          title: testTitle,
        },
      });
      expect(wrapper.get(formHeaderSelector).text()).toBe(testTitle);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(FormHeader);
    expect(wrapper.get(formHeaderSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <h1
          class="font-semibold text-3xl"
          data-testid="formHeader"
        />,
      }
    `);
  });
});
