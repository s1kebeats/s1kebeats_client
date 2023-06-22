import empty from './empty.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

const emptyLayoutSelector = '[data-testid=emptyLayout]';

describe('empty Layout', () => {
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(empty);
    expect(wrapper.get(emptyLayoutSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="flex flex-col items-center justify-center min-h-[100dvh]"
          data-testid="emptyLayout"
          id="empty"
        >
          
          
        </div>,
      }
    `);
  });
});
