import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LoadingScreen from './LoadingScreen.vue';
import { createTestingPinia } from '@pinia/testing';

const loadingScreenSelector = '[data-testid=loadingScreen]';

describe('LoadingScreen', () => {
  describe('ui store', () => {
    // ! not working properly
    it('loading - should be invisible when set to false', () => {
      const wrapper = shallowMount(LoadingScreen, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                ui: {
                  loading: false,
                },
              },
            }),
          ],
        },
      });

      expect(wrapper.get(loadingScreenSelector).isVisible()).toBe(false);
    });
    // ! not working properly
    it('loading - should be visible when set to true', () => {
      const wrapper = shallowMount(LoadingScreen, {
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

      expect(wrapper.get(loadingScreenSelector).isVisible()).toBe(true);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(LoadingScreen, {
      props: {
        loading: false,
      },
    });
    expect(wrapper.get(loadingScreenSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="absolute z-[2] flex w-full h-full bg-white"
          data-testid="loadingScreen"
          data-v-2d6f5cd9=""
        >
          <uilogo
            class="w-[15%] max-w-[300px] min-w-[175px] m-auto"
            data-v-2d6f5cd9=""
          />
        </div>,
      }
    `);
  });
});
