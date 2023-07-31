import defaultLayout from './default.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

const defaultLayoutSelector = '[data-testid=defaultLayout]';

describe('empty Layout', () => {
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(defaultLayout);
    expect(wrapper.get(defaultLayoutSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="flex flex-col min-h-[100dvh]"
          data-testid="defaultLayout"
          data-v-433a9abd=""
          id="default"
        >
          <header-stub
            data-v-433a9abd=""
          />
          <main
            class="grow w-full flex flex-col items-center gap-3"
            data-v-433a9abd=""
          >
            
            
          </main>
        </div>,
      }
    `);
  });
});
