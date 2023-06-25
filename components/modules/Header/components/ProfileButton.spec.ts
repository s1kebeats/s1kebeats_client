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
    it('click - should toggle uiStore.profileOverlay', async () => {
      const wrapper = shallowMount(ProfileButton, {
        global: {
          plugins: [
            createTestingPinia({
              stubActions: false,
            }),
          ],
        },
      });
      const uiStore = useUiStore();

      await wrapper.get(profileButtonSelector).trigger('click');
      vi.runAllTimers();
      expect(uiStore.profileOverlay).toBe(true);

      await wrapper.get(profileButtonSelector).trigger('click');
      vi.runAllTimers();
      expect(uiStore.profileOverlay).toBe(false);
    });
    it('click - should rotate the icon', async () => {
      const wrapper = shallowMount(ProfileButton, {
        global: {
          plugins: [
            createTestingPinia({
              stubActions: false,
            }),
          ],
        },
      });
      await wrapper.get(profileButtonSelector).trigger('click');
      vi.runAllTimers();
      expect(wrapper.get(profileButtonIconSelector).classes()).toContain(
        'rotate-180'
      );

      await wrapper.get(profileButtonSelector).trigger('click');
      vi.runAllTimers();
      expect(wrapper.get(profileButtonIconSelector).classes()).not.toContain(
        'rotate-180'
      );
    });
    it('focusout - should set uiStore.profileOverlay to false', async () => {
      const wrapper = shallowMount(ProfileButton, {
        global: {
          plugins: [
            createTestingPinia({
              stubActions: false,
              initialState: {
                ui: {
                  profileOverlay: true,
                },
              },
            }),
          ],
        },
      });
      const uiStore = useUiStore();

      await wrapper.get(profileButtonSelector).trigger('focusout');
      vi.runAllTimers();
      expect(uiStore.profileOverlay).toBe(false);
    });
    it('focusout - should rotate the icon', async () => {
      const wrapper = shallowMount(ProfileButton, {
        global: {
          plugins: [
            createTestingPinia({
              stubActions: false,
              initialState: {
                ui: {
                  profileOverlay: true,
                },
              },
            }),
          ],
        },
      });

      await wrapper.get(profileButtonSelector).trigger('focusout');
      // ?: works fine in browser ^-^
      vi.runAllTimers();
      expect(wrapper.get(profileButtonIconSelector).classes()).not.toContain(
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
          <profile-icon-stub />
          <icon
            class="transition-all"
            data-testid="profileButtonIcon"
            name="ic:baseline-keyboard-arrow-down"
            size="20px"
          />
        </button>,
      }
    `);
  });
});
