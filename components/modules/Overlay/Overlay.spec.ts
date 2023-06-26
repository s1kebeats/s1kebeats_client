import Overlay from './Overlay.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import type User from '@/api/models/User';

const overlaySelector = '[data-testid=overlay]';
const loginButtonSelector = '[data-testid=loginButton]';
const logoutButtonSelector = '[data-testid=logoutButton]';
const profileLinkSelector = '[data-testid=profileLink]';
const likedLinkSelector = '[data-testid=likedLink]';

const testUser: User = {
  email: 'test@example.com',
  username: 's1kebeats',
  id: 777,
  image: 'path/to/Image.png',
  displayedName: null,
};

describe('Overlay', () => {
  it('is not visible with uiStore.overlay set to false', async () => {
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
  it('is visible with uiStore.overlay set to true', async () => {
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
  it('should render login button when not authorized', async () => {
    const wrapper = shallowMount(overlay, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                authorized: false,
                user: null,
              },
              ui: {
                overlay: true,
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.find(loginButtonSelector).exists()).toBe(true);
    expect(wrapper.find(logoutButtonSelector).exists()).toBeFalsy();
    expect(wrapper.find(profileLinkSelector).exists()).toBeFalsy();
    expect(wrapper.find(likedLinkSelector).exists()).toBeFalsy();
  });
  it('should render logout button and links when authorized', async () => {
    const wrapper = shallowMount(overlay, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                authorized: true,
                user: testUser,
              },
              ui: {
                overlay: true,
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.find(loginButtonSelector).exists()).toBeFalsy();
    expect(wrapper.find(logoutButtonSelector).exists()).toBe(true);
    expect(wrapper.find(profileLinkSelector).exists()).toBe(true);
    expect(wrapper.find(likedLinkSelector).exists()).toBe(true);
  });
});
