import { shallowMount } from '@vue/test-utils';
import AppHeader from './AppHeader.vue';
import { describe, it, expect } from 'vitest';

describe('AppHeader', () => {
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(AppHeader);
    expect(wrapper.element).toMatchInlineSnapshot(`
          <header
            class="px-[5%] md:px-[10%] h-[64px] relative flex items-center justify-between gap-[5%]"
          >
            <nuxt-link
              to="/"
            >
              <app-logo-stub
                class="w-[55px] sm:w-[65px]"
                color="black"
              />
            </nuxt-link>
            <search-stub />
            <overlay-button-stub />
          </header>
        `);
  });
});
