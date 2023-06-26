import ActionPanel from './ActionPanel.vue';
import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { loggedUserMock } from '@/stores/api/mocks';

const uploadButtonSelector = '[data-testid=uploadButton]';
const loginButtonSelector = '[data-testid=loginButton]';
const registerButtonSelector = '[data-testid=registerButton]';
const logoutButtonSelector = '[data-testid=logoutButton]';
const actionPanelSelector = '[data-testid=actionPanel]';

describe('ActionPanel', () => {
  describe('auth store', () => {
    it('authorized - should render UploadButton and logoutButton when set to true', () => {
      const wrapper = shallowMount(ActionPanel, {
        global: {
          plugins: [
            createTestingPinia({
              initialState: {
                auth: {
                  authorized: true,
                  user: null,
                },
              },
            }),
          ],
        },
      });
      expect(wrapper.find(uploadButtonSelector).exists()).toBe(true);
      expect(wrapper.find(logoutButtonSelector).exists()).toBe(true);
    });
    it('authorized - should not render UploadButton and logoutButton when set to false', () => {
      const wrapper = shallowMount(ActionPanel, {
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
      expect(wrapper.find(uploadButtonSelector).exists()).toBe(false);
      expect(wrapper.find(logoutButtonSelector).exists()).toBe(false);
    });
    it('authorized - should render RegisterButton and LoginButton when set to false', () => {
      const wrapper = shallowMount(ActionPanel, {
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
      expect(wrapper.find(registerButtonSelector).exists()).toBe(true);
      expect(wrapper.find(loginButtonSelector).exists()).toBe(true);
    });
  });
  it('authorized - should not render RegisterButton and LoginButton when set to true', () => {
    const wrapper = shallowMount(ActionPanel, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              auth: {
                authorized: true,
                user: null,
              },
            },
          }),
        ],
      },
    });
    expect(wrapper.find(registerButtonSelector).exists()).toBe(false);
    expect(wrapper.find(loginButtonSelector).exists()).toBe(false);
  });

  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(ActionPanel, {
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
    expect(wrapper.get(actionPanelSelector)).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <div
          class="flex gap-[3%]"
          data-testid="actionPanel"
        >
          
          <upload-button-stub
            class="grow"
            data-testid="uploadButton"
          />
          <logout-button-stub
            data-testid="logoutButton"
          />
          
        </div>,
      }
    `);
  });
});
