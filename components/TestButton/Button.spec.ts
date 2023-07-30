import { shallowMount } from '@vue/test-utils';
import Button from './Button.vue';
import { describe, it, expect } from 'vitest';

describe('Button', () => {
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(Button);
    expect(wrapper.element).toMatchInlineSnapshot(`
      <button
        class="relative flex items-center justify-center link transition-all disabled:cursor-not-allowed desktop-text-sm rounded-xl min-h-[52px] px-6 gap-3 text-grayscale-bg bg-primary hover:bg-primary-default_strong focus:outline-8 focus:outline focus:outline-primary-bg_strong disabled:opacity-50 active:bg-grayscale-header"
      >
        <div
          class="flex items-center justify-center gap-3"
          data-testid="buttonContentWrapper"
        >
          
          
          <!--v-if-->
          <!--v-if-->
        </div>
        <!--v-if-->
      </button>
    `);
  });
});
