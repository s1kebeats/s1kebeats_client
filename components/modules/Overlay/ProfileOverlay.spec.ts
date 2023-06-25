import ProfileOverlay from './ProfileOverlay.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import type User from '@/api/models/User';

const profileOverlaySelector = '[data-testid=profileOverlay]';
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

describe('ProfileOverlay', () => {
  it('is not visible with uiStore.profileOverlay set to false', async () => {
    const wrapper = shallowMount(ProfileOverlay, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              ui: {
                profileOverlay: false,
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.get(profileOverlaySelector).isVisible()).toBeFalsy();
  });
  it('is visible with uiStore.profileOverlay set to true', async () => {
    const wrapper = shallowMount(ProfileOverlay, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              ui: {
                profileOverlay: true,
              },
            },
          }),
        ],
      },
    });

    expect(wrapper.get(profileOverlaySelector).isVisible()).toBe(true);
  });
  it('should render login button when not authorized', async () => {
    const wrapper = shallowMount(ProfileOverlay, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                authorized: false,
                user: null,
              },
              ui: {
                profileOverlay: true,
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
    const wrapper = shallowMount(ProfileOverlay, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                authorized: true,
                user: testUser,
              },
              ui: {
                profileOverlay: true,
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
