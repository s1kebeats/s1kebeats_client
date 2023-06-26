import Overlay from './Overlay.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

const overlaySelector = '[data-testid=overlay]';

describe('Overlay', () => {
  describe('ui store', () => {
    it('overlay - should not be visible when set to false', async () => {
      const wrapper = shallowMount(Overlay, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                ui: {
                  overlay: false,
                },
              },
            }),
          ],
        },
      });

      expect(wrapper.get(overlaySelector).isVisible()).toBeFalsy();
    });
    it('overlay - should be visible when set to true', async () => {
      const wrapper = shallowMount(Overlay, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                ui: {
                  overlay: true,
                },
              },
            }),
          ],
        },
      });

      expect(wrapper.get(overlaySelector).isVisible()).toBe(true);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(Overlay, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              ui: {
                overlay: true,
              },
            },
          }),
        ],
      },
    });
    expect(wrapper.get(overlaySelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="absolute z-[1] right-0 px-[3%] py-3 top-[64px] w-full h-[calc(100dvh-64px)] bg-white text-black flex flex-col justify-between"
          data-testid="overlay"
        >
          <clientonly>
            <ui-nav-stub />
            <action-panel-stub />
          </clientonly>
        </div>,
      }
    `);
  });
});
