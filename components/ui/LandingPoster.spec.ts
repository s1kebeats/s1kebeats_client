import { shallowMount } from '@vue/test-utils';
import LandingPoster from './LandingPoster.vue';
import { describe, it, expect } from 'vitest';

const landingPosterSelector = '[data-testid=landingPoster]';

describe('LandingPoster', () => {
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(LandingPoster);
    expect(wrapper.get(landingPosterSelector)).toMatchInlineSnapshot(`
          DOMWrapper {
            "isDisabled": [Function],
            "wrapperElement": <section
              class="bg-image select-none border-b flex items-center justify-center w-full h-[30vh]"
              data-testid="landingPoster"
              data-v-544c8d54=""
            >
              <div
                class="relative flex flex-col items-end justify-center text-black font-semibold font-[Poppins]"
                data-v-544c8d54=""
              >
                <h1
                  class="text-5xl"
                  data-v-544c8d54=""
                >
                  s1kebeats
                </h1>
                <h2
                  class="absolute top-[2.75rem] text-xl"
                  data-v-544c8d54=""
                >
                  2023
                </h2>
              </div>
            </section>,
          }
        `);
  });
});
