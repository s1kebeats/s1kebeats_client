import ProfileIcon from './ProfileIcon.vue';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import useAuthStore from '@/stores/auth';
import User from '@api/models/User';

const testUser: User = {
  email: 'test@example.com',
  username: 's1kebeats',
  id: 777,
  image: 'path/to/Image.png',
  displayedName: null,
};

describe('ProfileIcon', () => {
  it('', async () => {
    const wrapper = mount(ProfileIcon, {
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
    const authStore = useAuthStore();
  });
});
