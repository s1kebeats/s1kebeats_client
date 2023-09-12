import { shallowMount } from '@vue/test-utils';
import OverlayButton from './OverlayButton.vue';
import { describe, it, expect, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useUiStore } from '@/stores';

const overlayButtonSelector = '[data-testid=overlayButton]';
const overlayButtonIconSelector = '[data-testid=overlayButtonIcon]';

describe('OverlayButton', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });
  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });
  it('User Interactions', () => {
    it('click - should call uiStore.toggleOverlay', async () => {
      const wrapper = shallowMount(OverlayButton, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const uiStore = useUiStore();

      await wrapper.get(overlayButtonSelector).trigger('click');

      expect(uiStore.toggleOverlay).toHaveBeenCalled();
    });
    it('focusout - should call uiStore.setOverlay with "false"', async () => {
      const wrapper = shallowMount(OverlayButton, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const uiStore = useUiStore();

      await wrapper.get(overlayButtonSelector).trigger('focusout');
      vi.runAllTimers();
      expect(uiStore.setOverlay).toHaveBeenCalled();
      expect(uiStore.setOverlay).toHaveBeenCalledWith(false);
    });
  });
  describe('state', () => {
    it('uiStore.overlay - should render icon without "rotate-180" class when set to "false"', () => {
      const wrapper = shallowMount(OverlayButton, {
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
      expect(wrapper.get(overlayButtonIconSelector).classes()).not.toContain(
        'rotate-180'
      );
    });
    it('uiStore.overlay - should render icon with "rotate-180" class when set to "true"', () => {
      const wrapper = shallowMount(OverlayButton, {
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
      expect(wrapper.get(overlayButtonIconSelector).classes()).toContain(
        'rotate-180'
      );
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(OverlayButton);
    expect(wrapper.get(overlayButtonSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <button
          class="flex items-center gap-0.5"
          data-testid="overlayButton"
        >
          <clientonly>
            <profile-icon-stub />
          </clientonly>
          <anonymous-stub
            class="transition-all text-[20px] rotate-180"
            data-testid="overlayButtonIcon"
            icon="ic:baseline-keyboard-arrow-down"
          />
        </button>,
      }
    `);
  });
});
