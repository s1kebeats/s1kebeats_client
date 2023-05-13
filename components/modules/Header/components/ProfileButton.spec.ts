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
  it('toggles profile overlay and rotates icon on click', async () => {
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
    expect(wrapper.get(profileButtonIconSelector).classes()).not.toContain(
      'rotate-180'
    );

    await wrapper.get(profileButtonSelector).trigger('click');
    expect(uiStore.profileOverlay).toBe(true);
    expect(wrapper.get(profileButtonIconSelector).classes()).toContain(
      'rotate-180'
    );

    await wrapper.get(profileButtonSelector).trigger('click');
    expect(uiStore.profileOverlay).toBe(false);
    expect(wrapper.get(profileButtonIconSelector).classes()).not.toContain(
      'rotate-180'
    );
  });
  it('turns overlay off and rotates icon on unfocus', async () => {
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
    // ???
    expect(wrapper.get(profileButtonIconSelector).classes()).not.toContain(
      'rotate-180'
    );
  });
});
