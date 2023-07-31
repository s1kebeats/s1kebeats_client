import Header from './Header.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

const headerSelector = '[data-testid=header]';

describe('Header', () => {
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.get(headerSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <header
          class="header bg-[rgba(255,255,255,.9)]"
          data-testid="header"
          data-v-d95a922c=""
        >
          <nuxt-link
            data-v-d95a922c=""
            to="/"
          >
            <uilogo
              alt="s1kebeats"
              class="w-[54px]"
              data-v-d95a922c=""
            />
          </nuxt-link>
          <search-stub
            data-v-d95a922c=""
          />
          <profile-button-stub
            data-v-d95a922c=""
          />
        </header>,
      }
    `);
  });
});
