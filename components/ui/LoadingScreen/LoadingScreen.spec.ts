import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import LoadingScreen from './LoadingScreen.vue';
import { createTestingPinia } from '@pinia/testing';

const loadingScreenSelector = '[data-testid=loadingScreen]';

describe('LoadingScreen', () => {
  describe('ui store', () => {
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
      // ! isVisible() doesn't work properly, using a workaround
      expect(wrapper.get(loadingScreenSelector).attributes('style')).toBe(
        'display: none;'
      );
    });
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
      // ! isVisible() doesn't work properly, using a workaround
      expect(wrapper.get(loadingScreenSelector).attributes('style')).not.toBe(
        'display: none;'
      );
      expect(wrapper.get(loadingScreenSelector).isVisible()).toBe(true);
    });
  });
  it('snapshot - should match the snapshot', () => {
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
    expect(wrapper.get(loadingScreenSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="absolute z-[9999] w-full h-full bg-grayscale-bg flex"
          data-testid="loadingScreen"
          data-v-798013b0=""
        >
          <main-logo-stub
            class="w-[clamp(175px,15%,300px)] m-auto"
            color="black"
            data-v-798013b0=""
          />
        </div>,
      }
    `);
  });
});
