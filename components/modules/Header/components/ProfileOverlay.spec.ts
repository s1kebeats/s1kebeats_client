import ProfileOverlay from './ProfileOverlay.vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import User from '@/api/models/User';

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
    const wrapper = mount(ProfileOverlay, {
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

    expect(wrapper.get(profileOverlaySelector).isVisible()).toBe(false);
  });
  it('is visible with uiStore.profileOverlay set to true', async () => {
    const wrapper = mount(ProfileOverlay, {
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
  it('renders login button when not authorized', async () => {
    const wrapper = mount(ProfileOverlay, {
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
    expect(wrapper.find(logoutButtonSelector).exists()).toBe(false);
    expect(wrapper.find(profileLinkSelector).exists()).toBe(false);
    expect(wrapper.find(likedLinkSelector).exists()).toBe(false);
  });
  it('renders logout button and links when authorized', async () => {
    const wrapper = mount(ProfileOverlay, {
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

    expect(wrapper.find(loginButtonSelector).exists()).toBe(false);
    expect(wrapper.find(logoutButtonSelector).exists()).toBe(true);
    expect(wrapper.find(profileLinkSelector).exists()).toBe(true);
    expect(wrapper.find(likedLinkSelector).exists()).toBe(true);
  });
});
