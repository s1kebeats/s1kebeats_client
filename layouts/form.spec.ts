import form from './form.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

const formLayoutSelector = '[data-testid=formLayout]';

describe('form Layout', () => {
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(form);
    expect(wrapper.get(formLayoutSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="flex flex-col min-h-[100dvh]"
          data-testid="formLayout"
          id="form"
        >
          <main
            class="grow bg-white flex flex-col items-center justify-center gap-7 px-[7.5%] pb-5"
          >
            <nuxt-link
              to="/"
            >
              <uilogo
                class="mx-auto w-[35%]"
              />
            </nuxt-link>
            
            
          </main>
        </div>,
      }
    `);
  });
});
