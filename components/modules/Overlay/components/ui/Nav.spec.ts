import Nav from './Nav.vue';
import { describe, it, expect } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { shallowMount } from '@vue/test-utils';
import { loggedUserMock } from '@/stores/api/mocks';

const profileLinkSelector = '[data-testid=profileLink]';

describe('Nav', () => {
  describe('auth store', () => {
    it('authorized - should not render profile link when set to false', () => {
      const wrapper = shallowMount(Nav, {
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
      expect(wrapper.find(profileLinkSelector).exists()).toBe(false);
    });
    it('authorized - should render profile link when set to true', () => {
      const wrapper = shallowMount(Nav, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                auth: {
                  authorized: true,
                  user: loggedUserMock,
                },
              },
            }),
          ],
        },
      });
      expect(wrapper.find(profileLinkSelector).exists()).toBe(true);
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(Nav, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                authorized: true,
                user: loggedUserMock,
              },
            },
          }),
        ],
      },
    });
    expect(wrapper.get('nav')).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <nav
          class="w-full flex flex-col items-start gap-3"
        >
          <ui-nav-link-stub
            icon="material-symbols:home-outline-rounded"
            text="Главная"
            to="/"
          />
          <ui-nav-link-stub
            icon="mdi:account-music-outline"
            text="Авторы"
            to="/authors"
          />
          <ui-nav-link-stub
            icon="material-symbols:library-music-outline-rounded"
            text="Биты"
            to="/beats"
          />
          <!-- &lt;template v-if="authStore.authorized"&gt; -->
          <ui-nav-link-stub
            data-testid="profileLink"
            icon="gg:profile"
            text="Профиль"
            to="/username"
          />
          <!-- TODO: liked tracks functionality -->
          <!-- &lt;UiNavLink
                  to="/liked"
                  icon="icon-park-outline:like"
                  text="Понравившееся"
                /&gt;
          &lt;/template&gt; -->
        </nav>,
      }
    `);
  });
});
