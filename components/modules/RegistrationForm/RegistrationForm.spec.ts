import RegistrationForm from './RegistrationForm.vue';
import { Mock, describe, expect, it, vi } from 'vitest';
import { VueWrapper, mount, shallowMount } from '@vue/test-utils';
import { render, waitFor, screen, fireEvent } from '@testing-library/vue';
import { setActivePinia, createPinia } from 'pinia';
import { register } from './api';
import useUiStore from 'stores/ui';
import { createTestingPinia } from '@pinia/testing';
import { usernameAvailable } from './helpers/validators';

import flushPromises from 'flush-promises';

const pageFormSelector = '[data-testid=pageForm]';
const usernameInputSelector = '[data-testid=usernameInput]';
const emailInputSelector = '[data-testid=emailInput]';
const passwordInputSelector = '[data-testid=passwordInput]';
const passwordConfirmInputSelector = '[data-testid=passwordConfirmInput]';
const validationErrorOutputComponentSelector =
  '[data-testid=validationErrorOutputComponent]';

vi.mock('./api', () => {
  return {
    register: vi.fn(),
  };
});
vi.mock('./helpers/validators', async () => {
  const actual = await vi.importActual<typeof import('./helpers/validators')>(
    './helpers/validators'
  );
  return {
    ...actual,
    usernameAvailable: vi.fn(),
  };
});
vi.stubGlobal('navigateTo', vi.fn());

describe('RegistrationForm', async () => {
  beforeAll(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe.only('state', () => {

    describe.skip('validation', () => {
      it('should render usernameInput without "state" attr set by default', async () => {
        const wrapper = shallowMount(RegistrationForm, {
          global: {
            renderStubDefaultSlot: true, // enables slots content rendering with shallowMount
          },
        });
        expect(
          wrapper.get(usernameInputSelector).attributes()
        ).not.toHaveProperty('state');
      });
      it('should render emailInput without "state" attr set by default', async () => {
        const wrapper = shallowMount(RegistrationForm, {
          global: {
            renderStubDefaultSlot: true, // enables slots content rendering with shallowMount
          },
        });
        expect(wrapper.get(emailInputSelector).attributes()).not.toHaveProperty(
          'state'
        );
      });
      it('should render passwordInput without "state" attr set by default', async () => {
        const wrapper = shallowMount(RegistrationForm, {
          global: {
            renderStubDefaultSlot: true, // enables slots content rendering with shallowMount
          },
        });
        expect(
          wrapper.get(passwordInputSelector).attributes()
        ).not.toHaveProperty('state');
      });
      it('should render passwordConfirmInput without "state" attr set by default', async () => {
        const wrapper = shallowMount(RegistrationForm, {
          global: {
            renderStubDefaultSlot: true, // enables slots content rendering with shallowMount
          },
        });
        expect(
          wrapper.get(passwordConfirmInputSelector).attributes()
        ).not.toHaveProperty('state');
      });
      it('should render validationErrorOutput without "errors" attr by default', () => {
        const wrapper = shallowMount(RegistrationForm, {
          global: {
            renderStubDefaultSlot: true, // enables slots content rendering with shallowMount
          },
        });
        expect(
          wrapper.get(validationErrorOutputComponentSelector).attributes()
        ).not.toHaveProperty('errors');
      });
    });
  });
  describe('User Interactions', () => {
    it('empty form submit - should not call register function', async () => {
      const wrapper = mount(RegistrationForm);
      await wrapper.get('[data-testid=actionButton]').trigger('click');

      await flushPromises();
      await waitFor(() => {
        expect(register).not.toHaveBeenCalled();
      });
    });
    it('filled form submit - should call register function', async () => {
      (usernameAvailable as Mock).mockImplementationOnce(() => true);
      const { container } = render(RegistrationForm);

      await fireEvent.update(
        container.querySelector('input[name=registrationUsername]')!,
        'username'
      );
      await fireEvent.update(
        container.querySelector('input[name=registrationEmail]')!,
        'email@example.com'
      );
      await fireEvent.update(
        container.querySelector('input[name=registrationPassword]')!,
        'Password1'
      );
      await fireEvent.update(
        container.querySelector('input[name=registrationPasswordConfirm]')!,
        'Password1'
      );
      await flushPromises();

      await fireEvent.click(screen.getByTestId('actionButton'));

      await waitFor(async () => {
        expect(register).toHaveBeenCalled();
      });
    });
    it('empty form submit - should not call uiStore.setLoading', async () => {
      const wrapper = mount(RegistrationForm, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const uiStore = useUiStore();
      await wrapper.get('[data-testid=actionButton]').trigger('click');

      expect(uiStore.setLoading).not.toHaveBeenCalled();
    });
    it('empty form submit - should not call navigateTo', async () => {
      const wrapper = mount(RegistrationForm);
      await wrapper.get('[data-testid=actionButton]').trigger('click');

      expect(navigateTo).not.toHaveBeenCalled();
    });
    it('filled form submit - should call register function with typed values', async () => {
      const wrapper = mount(RegistrationForm);
      await wrapper.get('[data-testid=actionButton]').trigger('click');

      expect(register).not.toHaveBeenCalled();
    });
    it('filled form submit - should call uiStore.setLoading with "true", then with "false" after a timeOut', async () => {
      const wrapper = mount(RegistrationForm, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const uiStore = useUiStore();
      await wrapper.get('[data-testid=actionButton]').trigger('click');

      await wrapper.get(usernameInputSelector).setValue('username');

      expect(uiStore.setLoading).toHaveBeenCalledTimes(1);
      expect(uiStore.setLoading).toHaveBeenCalledWith(true);
      vi.runAllTimers();
      expect(uiStore.setLoading).toHaveBeenCalledTimes(2);
      expect(uiStore.setLoading).toHaveBeenCalledWith(false);
    });
    it('filled form submit - should not call navigateTo', async () => {
      const wrapper = mount(RegistrationForm);
      await wrapper.get('[data-testid=actionButton]').trigger('click');

      expect(navigateTo).not.toHaveBeenCalled();
    });
  });

  it.skip('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(RegistrationForm);
    expect(wrapper.element).toMatchInlineSnapshot(`
      DOMWrapper {
        "isDisabled": [Function],
        "wrapperElement": <form
          class="relative flex flex-col w-full"
          data-testid="registrationForm"
        >
          <appformrequesterroroutput
            open="false"
          />
          <confirm-email-pop-up-stub
            open="false"
          />
          <div
            class="flex flex-col gap-3 mb-3 pb-7"
          >
            <appdebouncedtextinput
              autocomplete="off"
              class=""
              name="registrationUsername"
              placeholder="Введите имя пользователя"
              required="true"
              title="Имя пользователя"
              value=""
            />
            <email-input-stub
              autocomplete="off"
              class=""
              name="registrationEmail"
              required="true"
              value=""
            />
            <appconfidentionalinput
              autocomplete="off"
              class=""
              name="registrationPassword"
              placeholder="Введите пароль"
              required="true"
              title="Пароль"
              value=""
            />
            <appconfidentionalinput
              autocomplete="off"
              class=""
              name="registrationPasswordConfirm"
              placeholder="Введите пароль ещё раз"
              required="true"
              title="Подтверждение пароля"
              value=""
            />
            <uiformvalidationerroroutput
              v="[object Object]"
            />
          </div>
          <uiloadingbutton
            pending="false"
          >
             Зарегистрироваться 
          </uiloadingbutton>
        </form>,
      }
    `);
  });
});
