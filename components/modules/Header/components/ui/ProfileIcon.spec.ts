import ProfileIcon from './ProfileIcon.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import type User from '@/api/models/User';

const unauthorizedIconSelector = '[data-testid=unauthorizedIcon]';
const presentationalAvatarSelector = '[data-testid=presentationalAvatar]';

const testUser: User = {
  email: 'test@example.com',
  username: 's1kebeats',
  id: 777,
  image: 'path/to/Image.png',
  displayedName: null,
};

describe('ProfileIcon', () => {
  describe('state', () => {
    it('authStore.authorized - should render unauthorized icon without presentationalAvatar when set to "false"', async () => {
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
      expect(wrapper.find(presentationalAvatarSelector).exists()).toBeFalsy();
    });
    it('authStore.authorized - should render presentationalAvatar without unauthorized icon when set to "true"', async () => {
      const wrapper = shallowMount(ProfileIcon, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                auth: {
                  authorized: true,
                  user: testUser,
                },
              },
            }),
          ],
        },
      });
  
      expect(wrapper.find(unauthorizedIconSelector).exists()).toBeFalsy();
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
                  user: testUser,
                },
              },
            }),
          ],
        },
      });
      expect(wrapper.get(presentationalAvatarSelector).attributes('username')).toBe(testUser.username)
    })
    it('authStore.user - should render presentationalAvatar with set image', () => {
      const wrapper = shallowMount(ProfileIcon, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                auth: {
                  authorized: true,
                  user: testUser,
                },
              },
            }),
          ],
        },
      });
      expect(wrapper.get(presentationalAvatarSelector).attributes('image')).toBe(testUser.image)
    })
  })

});
