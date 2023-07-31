import ProfileButton from './ProfileButton.vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import useUiStore from '@/stores/ui';

const profileButtonSelector = '[data-testid=profileButton]';
const profileButtonIconSelector = '[data-testid=profileButtonIcon]';

describe('ProfileButton', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  describe('User Interactions', () => {
    it('click - should call uiStore.toggleOverlay', async () => {
      const wrapper = shallowMount(ProfileButton, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const uiStore = useUiStore();

      await wrapper.get(profileButtonSelector).trigger('click');

      expect(uiStore.toggleOverlay).toHaveBeenCalled();
    });
    it('focusout - should call uiStore.setOverlay with "false"', async () => {
      const wrapper = shallowMount(ProfileButton, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const uiStore = useUiStore();

      await wrapper.get(profileButtonSelector).trigger('focusout');
      vi.runAllTimers();
      expect(uiStore.setOverlay).toHaveBeenCalled();
      expect(uiStore.setOverlay).toHaveBeenCalledWith(false);
    });
  });
  describe('state', () => {
    it('uiStore.overlay - should render icon without "rotate-180" class when set to "false"', () => {
      const wrapper = shallowMount(ProfileButton, {
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
      expect(wrapper.get(profileButtonIconSelector).classes()).not.toContain(
        'rotate-180'
      );
    });
    it('uiStore.overlay - should render icon with "rotate-180" class when set to "true"', () => {
      const wrapper = shallowMount(ProfileButton, {
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
      expect(wrapper.get(profileButtonIconSelector).classes()).toContain(
        'rotate-180'
      );
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(ProfileButton);
    expect(wrapper.get(profileButtonSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <button
          class="flex items-center gap-1"
          data-testid="profileButton"
        >
          <clientonly>
            <profile-icon-stub />
          </clientonly>
          <icon
            class="transition-all rotate-180"
            data-testid="profileButtonIcon"
            name="ic:baseline-keyboard-arrow-down"
            size="20px"
          />
        </button>,
      }
    `);
  });
});
