import ProfileIcon from './ProfileIcon.vue';
import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import { UserMock } from '@/mocks';

const unauthorizedIconSelector = '[data-testid=unauthorizedIcon]';
const presentationalAvatarSelector = '[data-testid=presentationalAvatar]';

describe('ProfileIcon.vue', () => {
  describe('state', () => {
    it('authStore.authorized - should render unauthorized icon without presentationalAvatar when set to "false"', () => {
      const wrapper = shallowMount(ProfileIcon, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                auth: {
                  authorized: false,
                  user: null,
                },
              },
            }),
          ],
        },
      });
      expect(wrapper.find(unauthorizedIconSelector).exists()).toBe(true);
      expect(wrapper.find(presentationalAvatarSelector).exists()).toBe(false);
    });
    it('authStore.authorized - should render presentationalAvatar without unauthorized icon when set to "true"', () => {
      const wrapper = shallowMount(ProfileIcon, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                auth: {
                  authorized: true,
                  user: UserMock,
                },
              },
            }),
          ],
        },
      });
      expect(wrapper.find(unauthorizedIconSelector).exists()).toBe(false);
      expect(wrapper.find(presentationalAvatarSelector).exists()).toBe(true);
    });
    it('authStore.user - should render presentationalAvatar with set username', () => {
      const wrapper = shallowMount(ProfileIcon, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                auth: {
                  authorized: true,
                  user: UserMock,
                },
              },
            }),
          ],
        },
      });
      expect(
        wrapper.get(presentationalAvatarSelector).attributes('username')
      ).toBe(UserMock.username);
    });
    it('authStore.user - should render presentationalAvatar with set image', () => {
      const wrapper = shallowMount(ProfileIcon, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                auth: {
                  authorized: true,
                  user: UserMock,
                },
              },
            }),
          ],
        },
      });
      expect(
        wrapper.get(presentationalAvatarSelector).attributes('image')
      ).toBe(UserMock.image);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(ProfileIcon, {
        global: {
            plugins: [
              createTestingPinia({
                initialState: {
                  auth: {
                    authorized: true,
                    user: UserMock,
                  },
                },
              }),
            ],
          },
    })
    expect(wrapper.element).toMatchInlineSnapshot(`
      <presentational-avatar-stub
        data-testid="presentationalAvatar"
        image="/path/to/image"
        size="sm"
        username="username"
      />
    `);
  })
});
