import RegistrationForm from './RegistrationForm.vue';
import { describe, expect, it, vi, beforeAll, beforeEach, Mock } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { register } from './api';
import useUiStore from 'stores/ui';
import { createTestingPinia } from '@pinia/testing';

import flushPromises from 'flush-promises';
import validationMessages from '@/components/shared/validationMessages';
import { RegisterRequestBodyMock } from '@/mocks/requestBodies';
import { usernameAvailable } from './helpers/validators';

const pageFormSelector = '[data-testid=pageForm]';
const usernameInputSelector = '[data-testid=usernameInput]';
const emailInputSelector = '[data-testid=emailInput]';
const passwordInputSelector = '[data-testid=passwordInput]';
const passwordConfirmInputSelector = '[data-testid=passwordConfirmInput]';
const validationErrorOutputComponentSelector =
  '[data-testid=validationErrorOutputComponent]';

vi.mock('./api', async () => {
  const actual = await vi.importActual<typeof import('./api')>('./api');
  return {
    ...actual,
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
    vi.clearAllTimers();
    vi.clearAllMocks();
  });
  describe('state', () => {
    it('should render PageForm with "errorstate" attr set to "false" by default', () => {
      const wrapper = shallowMount(RegistrationForm);
      expect(wrapper.get(pageFormSelector).attributes('errorstate')).toBe(
        'false'
      );
    });
    it('should render PageForm with "pending" set to "false" by default', () => {
      const wrapper = shallowMount(RegistrationForm);
      expect(wrapper.get(pageFormSelector).attributes('pending')).toBe('false');
    });
    it('should render ValidationErrorOutput with "errors" attr set to "" by default', () => {
      const wrapper = shallowMount(RegistrationForm, {
        global: {
          renderStubDefaultSlot: true, // enables slots content rendering with shallowMount
        },
      });
      expect(
        wrapper.get(validationErrorOutputComponentSelector).attributes('errors')
      ).toBe('');
    });
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
  });
  describe('User Interactions', () => {
    describe('username input', () => {
      it('unavailable username form submit', async () => {
        (usernameAvailable as Mock).mockResolvedValue(false);

        const wrapper = mount(RegistrationForm, {
          global: {
            plugins: [createTestingPinia()],
          },
        });
        const uiStore = useUiStore();

        await wrapper
          .get('input[name=registrationUsername]')
          .setValue(RegisterRequestBodyMock.username);
        await wrapper
          .get('input[name=registrationEmail]')
          .setValue(RegisterRequestBodyMock.email);
        await wrapper
          .get('input[name=registrationPassword]')
          .setValue(RegisterRequestBodyMock.password);
        await wrapper
          .get('input[name=registrationPasswordConfirm]')
          .setValue(RegisterRequestBodyMock.password);

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        await wrapper.find('form').trigger('submit');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        // should render validationErrorOutput with username.available validationMessage
        expect(
          wrapper.find('[data-testid=validationErrorOutput]').exists()
        ).toBe(true);
        expect(wrapper.find('[data-testid=validationErrorOutput]').text()).toBe(
          validationMessages.username.available
        );

        // should not call register
        expect(register).not.toHaveBeenCalled();

        // should not call navigateTo
        expect(navigateTo).not.toHaveBeenCalled();

        // should not call uiStore.setLoading
        expect(uiStore.setLoading).not.toHaveBeenCalled();
      });
      it('username with special chars form submit', async () => {
        (usernameAvailable as Mock).mockResolvedValue(true);

        const wrapper = mount(RegistrationForm, {
          global: {
            plugins: [createTestingPinia()],
          },
        });
        const uiStore = useUiStore();

        await wrapper
          .get('input[name=registrationUsername]')
          .setValue('username!');
        await wrapper
          .get('input[name=registrationEmail]')
          .setValue(RegisterRequestBodyMock.email);
        await wrapper
          .get('input[name=registrationPassword]')
          .setValue(RegisterRequestBodyMock.password);
        await wrapper
          .get('input[name=registrationPasswordConfirm]')
          .setValue(RegisterRequestBodyMock.password);

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        await wrapper.find('form').trigger('submit');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        // should render validationErrorOutput with username.noSpecialChars validationMessage
        expect(
          wrapper.find('[data-testid=validationErrorOutput]').exists()
        ).toBe(true);
        expect(wrapper.find('[data-testid=validationErrorOutput]').text()).toBe(
          validationMessages.username.noSpecialChars
        );

        // should not call register
        expect(register).not.toHaveBeenCalled();

        // should not call navigateTo
        expect(navigateTo).not.toHaveBeenCalled();

        // should not call uiStore.setLoading
        expect(uiStore.setLoading).not.toHaveBeenCalled();
      });
      it('empty username form submit', async () => {
        (usernameAvailable as Mock).mockResolvedValue(true);

        const wrapper = mount(RegistrationForm, {
          global: {
            plugins: [createTestingPinia()],
          },
        });
        const uiStore = useUiStore();

        await wrapper
          .get('input[name=registrationEmail]')
          .setValue(RegisterRequestBodyMock.email);
        await wrapper
          .get('input[name=registrationPassword]')
          .setValue(RegisterRequestBodyMock.password);
        await wrapper
          .get('input[name=registrationPasswordConfirm]')
          .setValue(RegisterRequestBodyMock.password);

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        await wrapper.find('form').trigger('submit');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        // should render validationErrorOutput with username.required validationMessage
        expect(
          wrapper.find('[data-testid=validationErrorOutput]').exists()
        ).toBe(true);
        expect(wrapper.find('[data-testid=validationErrorOutput]').text()).toBe(
          validationMessages.username.required
        );

        // should not call register
        expect(register).not.toHaveBeenCalled();

        // should not call navigateTo
        expect(navigateTo).not.toHaveBeenCalled();

        // should not call uiStore.setLoading
        expect(uiStore.setLoading).not.toHaveBeenCalled();
      });
    });
    describe('email input', () => {
      it('invalid email form submit', async () => {
        (usernameAvailable as Mock).mockResolvedValue(true);

        const wrapper = mount(RegistrationForm, {
          global: {
            plugins: [createTestingPinia()],
          },
        });
        const uiStore = useUiStore();

        await wrapper
          .get('input[name=registrationUsername]')
          .setValue(RegisterRequestBodyMock.username);
        await wrapper
          .get('input[name=registrationEmail]')
          .setValue('invalid@email');
        await wrapper
          .get('input[name=registrationPassword]')
          .setValue(RegisterRequestBodyMock.password);
        await wrapper
          .get('input[name=registrationPasswordConfirm]')
          .setValue(RegisterRequestBodyMock.password);

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        await wrapper.find('form').trigger('submit');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        // should render validationErrorOutput with email.valid validationMessage
        expect(
          wrapper.find('[data-testid=validationErrorOutput]').exists()
        ).toBe(true);
        expect(wrapper.find('[data-testid=validationErrorOutput]').text()).toBe(
          validationMessages.email.valid
        );

        // should not call register
        expect(register).not.toHaveBeenCalled();

        // should not call navigateTo
        expect(navigateTo).not.toHaveBeenCalled();

        // should not call uiStore.setLoading
        expect(uiStore.setLoading).not.toHaveBeenCalled();
      });
      it('empty email form submit', async () => {
        (usernameAvailable as Mock).mockResolvedValue(true);

        const wrapper = mount(RegistrationForm, {
          global: {
            plugins: [createTestingPinia()],
          },
        });
        const uiStore = useUiStore();

        await wrapper
          .get('input[name=registrationUsername]')
          .setValue(RegisterRequestBodyMock.username);
        await wrapper
          .get('input[name=registrationPassword]')
          .setValue(RegisterRequestBodyMock.password);
        await wrapper
          .get('input[name=registrationPasswordConfirm]')
          .setValue(RegisterRequestBodyMock.password);

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        await wrapper.find('form').trigger('submit');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        // should render validationErrorOutput with email.required validationMessage
        expect(
          wrapper.find('[data-testid=validationErrorOutput]').exists()
        ).toBe(true);
        expect(wrapper.find('[data-testid=validationErrorOutput]').text()).toBe(
          validationMessages.email.required
        );

        // should not call register
        expect(register).not.toHaveBeenCalled();

        // should not call navigateTo
        expect(navigateTo).not.toHaveBeenCalled();

        // should not call uiStore.setLoading
        expect(uiStore.setLoading).not.toHaveBeenCalled();
      });
    });
    describe('password input', () => {
      it('less than 8 chars long password form submit', async () => {
        (usernameAvailable as Mock).mockResolvedValue(true);

        const wrapper = mount(RegistrationForm, {
          global: {
            plugins: [createTestingPinia()],
          },
        });
        const uiStore = useUiStore();

        await wrapper
          .get('input[name=registrationUsername]')
          .setValue(RegisterRequestBodyMock.username);
        await wrapper
          .get('input[name=registrationEmail]')
          .setValue(RegisterRequestBodyMock.email);
        await wrapper
          .get('input[name=registrationPassword]')
          .setValue('1234567');
        await wrapper
          .get('input[name=registrationPasswordConfirm]')
          .setValue('1234567');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        await wrapper.find('form').trigger('submit');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        // should render validationErrorOutput with password.min validationMessage
        expect(
          wrapper.find('[data-testid=validationErrorOutput]').exists()
        ).toBe(true);
        expect(wrapper.find('[data-testid=validationErrorOutput]').text()).toBe(
          validationMessages.password.min
        );

        // should not call register
        expect(register).not.toHaveBeenCalled();

        // should not call navigateTo
        expect(navigateTo).not.toHaveBeenCalled();

        // should not call uiStore.setLoading
        expect(uiStore.setLoading).not.toHaveBeenCalled();
      });
      it('password without digit form submit', async () => {
        (usernameAvailable as Mock).mockResolvedValue(true);

        const wrapper = mount(RegistrationForm, {
          global: {
            plugins: [createTestingPinia()],
          },
        });
        const uiStore = useUiStore();

        await wrapper
          .get('input[name=registrationUsername]')
          .setValue(RegisterRequestBodyMock.username);
        await wrapper
          .get('input[name=registrationEmail]')
          .setValue(RegisterRequestBodyMock.email);
        await wrapper
          .get('input[name=registrationPassword]')
          .setValue('password');
        await wrapper
          .get('input[name=registrationPasswordConfirm]')
          .setValue('password');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        await wrapper.find('form').trigger('submit');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        // should render validationErrorOutput with password.withDigit validationMessage
        expect(
          wrapper.find('[data-testid=validationErrorOutput]').exists()
        ).toBe(true);
        expect(wrapper.find('[data-testid=validationErrorOutput]').text()).toBe(
          validationMessages.password.withDigit
        );

        // should not call register
        expect(register).not.toHaveBeenCalled();

        // should not call navigateTo
        expect(navigateTo).not.toHaveBeenCalled();

        // should not call uiStore.setLoading
        expect(uiStore.setLoading).not.toHaveBeenCalled();
      });
      it('password without capital letter form submit', async () => {
        (usernameAvailable as Mock).mockResolvedValue(true);

        const wrapper = mount(RegistrationForm, {
          global: {
            plugins: [createTestingPinia()],
          },
        });
        const uiStore = useUiStore();

        await wrapper
          .get('input[name=registrationUsername]')
          .setValue(RegisterRequestBodyMock.username);
        await wrapper
          .get('input[name=registrationEmail]')
          .setValue(RegisterRequestBodyMock.email);
        await wrapper
          .get('input[name=registrationPassword]')
          .setValue('password1');
        await wrapper
          .get('input[name=registrationPasswordConfirm]')
          .setValue('password1');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        await wrapper.find('form').trigger('submit');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        // should render validationErrorOutput with password.withCapitalLetter validationMessage
        expect(
          wrapper.find('[data-testid=validationErrorOutput]').exists()
        ).toBe(true);
        expect(wrapper.find('[data-testid=validationErrorOutput]').text()).toBe(
          validationMessages.password.withCapitalLetter
        );

        // should not call register
        expect(register).not.toHaveBeenCalled();

        // should not call navigateTo
        expect(navigateTo).not.toHaveBeenCalled();

        // should not call uiStore.setLoading
        expect(uiStore.setLoading).not.toHaveBeenCalled();
      });
      it('empty password form submit', async () => {
        (usernameAvailable as Mock).mockResolvedValue(true);

        const wrapper = mount(RegistrationForm, {
          global: {
            plugins: [createTestingPinia()],
          },
        });
        const uiStore = useUiStore();

        await wrapper
          .get('input[name=registrationUsername]')
          .setValue(RegisterRequestBodyMock.username);
        await wrapper
          .get('input[name=registrationEmail]')
          .setValue(RegisterRequestBodyMock.email);
        await wrapper
          .get('input[name=registrationPasswordConfirm]')
          .setValue(RegisterRequestBodyMock.password);

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        await wrapper.find('form').trigger('submit');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        // should render validationErrorOutput with password.required validationMessage
        expect(
          wrapper.find('[data-testid=validationErrorOutput]').exists()
        ).toBe(true);
        expect(wrapper.find('[data-testid=validationErrorOutput]').text()).toBe(
          validationMessages.password.required
        );

        // should not call register
        expect(register).not.toHaveBeenCalled();

        // should not call navigateTo
        expect(navigateTo).not.toHaveBeenCalled();

        // should not call uiStore.setLoading
        expect(uiStore.setLoading).not.toHaveBeenCalled();
      });
    });
    describe('passwordConfirm input', () => {
      it('unmatched passwordConfirm form submit', async () => {
        (usernameAvailable as Mock).mockResolvedValue(true);

        const wrapper = mount(RegistrationForm, {
          global: {
            plugins: [createTestingPinia()],
          },
        });
        const uiStore = useUiStore();

        await wrapper
          .get('input[name=registrationUsername]')
          .setValue(RegisterRequestBodyMock.username);
        await wrapper
          .get('input[name=registrationEmail]')
          .setValue(RegisterRequestBodyMock.email);
        await wrapper
          .get('input[name=registrationPassword]')
          .setValue(RegisterRequestBodyMock.password);
        await wrapper
          .get('input[name=registrationPasswordConfirm]')
          .setValue('unmatched');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        await wrapper.find('form').trigger('submit');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        // should render validationErrorOutput with passwordConfirm.match validationMessage
        expect(
          wrapper.find('[data-testid=validationErrorOutput]').exists()
        ).toBe(true);
        expect(wrapper.find('[data-testid=validationErrorOutput]').text()).toBe(
          validationMessages.passwordConfirm.match
        );

        // should not call register
        expect(register).not.toHaveBeenCalled();

        // should not call navigateTo
        expect(navigateTo).not.toHaveBeenCalled();

        // should not call uiStore.setLoading
        expect(uiStore.setLoading).not.toHaveBeenCalled();
      });
      it('empty passwordConfirm form submit', async () => {
        (usernameAvailable as Mock).mockResolvedValue(true);

        const wrapper = mount(RegistrationForm, {
          global: {
            plugins: [createTestingPinia()],
          },
        });
        const uiStore = useUiStore();

        await wrapper
          .get('input[name=registrationUsername]')
          .setValue(RegisterRequestBodyMock.username);
        await wrapper
          .get('input[name=registrationEmail]')
          .setValue(RegisterRequestBodyMock.email);
        await wrapper
          .get('input[name=registrationPassword]')
          .setValue(RegisterRequestBodyMock.password);

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        await wrapper.find('form').trigger('submit');

        await flushPromises();
        vi.runAllTimers();
        await flushPromises();

        // should render validationErrorOutput with passwordConfirm.required validationMessage
        expect(
          wrapper.find('[data-testid=validationErrorOutput]').exists()
        ).toBe(true);
        expect(wrapper.find('[data-testid=validationErrorOutput]').text()).toBe(
          validationMessages.passwordConfirm.required
        );

        // should not call register
        expect(register).not.toHaveBeenCalled();

        // should not call navigateTo
        expect(navigateTo).not.toHaveBeenCalled();

        // should not call uiStore.setLoading
        expect(uiStore.setLoading).not.toHaveBeenCalled();
      });
    });

    it('empty form submit', async () => {
      const wrapper = mount(RegistrationForm, {
        global: {
          plugins: [createTestingPinia()],
          stubs: {
            UsernameInput: true,
            EmailInput: true,
            ConfidentialInput: true,
          },
        },
      });
      const uiStore = useUiStore();
      await wrapper.find('form').trigger('submit');

      await flushPromises();
      vi.runAllTimers();
      await flushPromises();

      // should render validationErrorOutput with username.required validationMessage
      expect(wrapper.find('[data-testid=validationErrorOutput]').exists()).toBe(
        true
      );
      expect(wrapper.find('[data-testid=validationErrorOutput]').text()).toBe(
        validationMessages.username.required
      );

      // should set "state" attr to "error" on all inputs
      expect(wrapper.get(usernameInputSelector).attributes('state')).toBe(
        'error'
      );
      expect(wrapper.get(emailInputSelector).attributes('state')).toBe('error');
      expect(wrapper.get(passwordInputSelector).attributes('state')).toBe(
        'error'
      );
      expect(
        wrapper.get(passwordConfirmInputSelector).attributes('state')
      ).toBe('error');

      // should not call register
      expect(register).not.toHaveBeenCalled();

      // should not call navigateTo
      expect(navigateTo).not.toHaveBeenCalled();

      // should not call uiStore.setLoading
      expect(uiStore.setLoading).not.toHaveBeenCalled();
    });
    it('valid form submit with register success', async () => {
      (usernameAvailable as Mock).mockResolvedValue(true);
      const wrapper = mount(RegistrationForm, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const uiStore = useUiStore();

      await wrapper
        .get('input[name=registrationUsername]')
        .setValue(RegisterRequestBodyMock.username);
      await wrapper
        .get('input[name=registrationEmail]')
        .setValue(RegisterRequestBodyMock.email);
      await wrapper
        .get('input[name=registrationPassword]')
        .setValue(RegisterRequestBodyMock.password);
      await wrapper
        .get('input[name=registrationPasswordConfirm]')
        .setValue(RegisterRequestBodyMock.password);

      await flushPromises();
      vi.runAllTimers();
      await flushPromises();

      await wrapper.find('form').trigger('submit');

      await flushPromises();
      vi.runAllTimers();
      await flushPromises();

      // should not render validationErrorOutput
      expect(wrapper.find('[data-testid=validationErrorOutput]').exists()).toBe(
        false
      );

      // should call register with typed data
      expect(register).toHaveBeenCalled();
      expect(register).toHaveBeenCalledWith({
        username: RegisterRequestBodyMock.username,
        email: RegisterRequestBodyMock.email,
        password: RegisterRequestBodyMock.password,
      });

      // should render requestErrorOutput invisible
      // ! isVisible() doesn't work properly, using a workaround
      expect(
        wrapper.get('[data-testid=requestErrorOutput]').attributes('style')
      ).toBe('display: none;');

      // should call uiStore.setLoading with "true"
      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.setLoading).toHaveBeenCalledWith(true);

      // should call navigateTo with '/login'
      expect(navigateTo).toHaveBeenCalled();
      expect(navigateTo).toHaveBeenCalledWith('/login');

      // should call uiStore.setLoading with "false" after timeout
      vi.runAllTimers();
      expect(uiStore.setLoading).toHaveBeenCalled();
      expect(uiStore.setLoading).toHaveBeenCalledWith(false);
    });
    it('valid form submit with register error', async () => {
      (usernameAvailable as Mock).mockResolvedValue(true);
      (register as Mock).mockRejectedValue({});
      const wrapper = mount(RegistrationForm, {
        global: {
          plugins: [createTestingPinia()],
        },
      });
      const uiStore = useUiStore();

      await wrapper
        .get('input[name=registrationUsername]')
        .setValue(RegisterRequestBodyMock.username);
      await wrapper
        .get('input[name=registrationEmail]')
        .setValue(RegisterRequestBodyMock.email);
      await wrapper
        .get('input[name=registrationPassword]')
        .setValue(RegisterRequestBodyMock.password);
      await wrapper
        .get('input[name=registrationPasswordConfirm]')
        .setValue(RegisterRequestBodyMock.password);

      await flushPromises();
      vi.runAllTimers();
      await flushPromises();

      await wrapper.find('form').trigger('submit');

      await flushPromises();
      vi.runAllTimers();
      await flushPromises();

      // should not render validationErrorOutput
      expect(wrapper.find('[data-testid=validationErrorOutput]').exists()).toBe(
        false
      );

      // should call register with typed data
      expect(register).toHaveBeenCalled();
      expect(register).toHaveBeenCalledWith({
        username: RegisterRequestBodyMock.username,
        email: RegisterRequestBodyMock.email,
        password: RegisterRequestBodyMock.password,
      });

      // should render requestErrorOutput visible
      // ! isVisible() doesn't work properly, using a workaround
      expect(
        wrapper.get('[data-testid=requestErrorOutput]').attributes('style')
      ).not.toBe('display: none;');

      // should not call uiStore.setLoading
      expect(uiStore.setLoading).not.toHaveBeenCalled();

      // should not call navigateTo
      expect(navigateTo).not.toHaveBeenCalled();
    });
  });
});
