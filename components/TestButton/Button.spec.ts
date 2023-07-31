import { shallowMount } from '@vue/test-utils';
import Button from './Button.vue';
import { describe, it, expect } from 'vitest';
import { createTestingPinia } from '@pinia/testing';

describe('Button', () => {
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(Button, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              ui: {
                loading: true,
              },
            },
          }),
        ],
      },
    });
    expect(wrapper.element).toMatchInlineSnapshot(`
      <button
        class="relative bg-yellow-500 flex items-center justify-center link transition-all disabled:cursor-not-allowed desktop-text-sm rounded-xl min-h-[52px] px-6 gap-3"
      >
        <div
          class="flex items-center justify-center gap-3"
          data-testid="buttonContentWrapper"
        >
          
          
        </div>
      </button>
    `);
  });
});
