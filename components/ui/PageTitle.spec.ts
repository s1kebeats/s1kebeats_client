import { shallowMount } from '@vue/test-utils';
import PageTitle from './PageTitle.vue';
import { describe, expect, it } from 'vitest';

const pageTitleSelector = '[data-testid=pageTitle]';

describe('PageTitle', () => {
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(PageTitle);
    expect(wrapper.get(pageTitleSelector)).toMatchInlineSnapshot(`
          DOMWrapper {
            "isDisabled": [Function],
            "wrapperElement": <h1
              class="font-semibold text-2xl mt-3"
              data-testid="pageTitle"
            >
              
              
            </h1>,
          }
        `);
  });
});
