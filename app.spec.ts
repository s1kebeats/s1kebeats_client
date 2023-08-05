import app from './app.vue';
import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';

describe('app', () => {
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(app);
    expect(wrapper.element).toMatchInlineSnapshot(`
          <div
            data-v-app=""
          >
            
            <loading-screen-stub />
            <nuxtlayout>
              <nuxtpage />
            </nuxtlayout>
            
          </div>
        `);
  });
});
