import LoginPart from './LoginPart.vue';
import { describe, it, expect, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { VueWrapper, mount, shallowMount } from '@vue/test-utils';
import { LoginRequestBodyMock } from '@/mocks/requestBodies';
import flushPromises from 'flush-promises';
import validationMessages from '@/components/shared/validationMessages';

const pageFormSelector = '[data-testid=pageForm]';
const validationErrorOutputComponentSelector =
  '[data-testid=validationErrorOutputComponent]';
const usernameInputSelector = '[data-testid=usernameInput]';
const passwordInputSelector = '[data-testid=passwordInput]';
const rememberMeInputSelector = '[data-testid=rememberMeInput]';

const defaultMountOptions = {
  props: {
    errorState: true,
    errorStatus: 500,
    apiSubmitting: true,
  },
};

describe('LoginPart', () => {
  beforeAll(() => {
    setActivePinia(createPinia());
    vi.useFakeTimers();
  });
  beforeEach(() => {
    vi.clearAllTimers();
    vi.clearAllMocks();
  });
  describe('props', () => {
    it('errorState - should render pageForm with set errorState attr', () => {
      const wrapper = shallowMount(LoginPart, defaultMountOptions);
      expect(wrapper.get(pageFormSelector).attributes('errorstate')).toBe(
        defaultMountOptions.props.errorState.toString()
      );
    });
    it('errorStatus - should render pageForm with set errorStatus attr', () => {
      const wrapper = shallowMount(LoginPart, defaultMountOptions);
      expect(wrapper.get(pageFormSelector).attributes('errorstatus')).toBe(
        defaultMountOptions.props.errorStatus.toString()
      );
    });
    it('apiSubmitting - should render pageForm with set pending attr', () => {
      const wrapper = shallowMount(LoginPart, defaultMountOptions);
      expect(wrapper.get(pageFormSelector).attributes('pending')).toBe(
        defaultMountOptions.props.apiSubmitting.toString()
      );
    });
  });
  describe('state', () => {
    it('should render PageForm with "pending" set to "false" by default', () => {
      const wrapper = shallowMount(LoginPart, {
        props: {
          ...defaultMountOptions.props,
          apiSubmitting: false,
        },
      });
      expect(wrapper.get(pageFormSelector).attributes('pending')).toBe('false');
    });
    it('should render ValidationErrorOutput with "errors" attr set to "" by default', () => {
      const wrapper = shallowMount(LoginPart, {
        props: defaultMountOptions.props,
        global: {
          renderStubDefaultSlot: true, // enables slots content rendering with shallowMount
        },
      });
      expect(
        wrapper.get(validationErrorOutputComponentSelector).attributes('errors')
      ).toBe('');
    });
    it('should render usernameInput without "state" attr set by default', async () => {
      const wrapper = shallowMount(LoginPart, {
        props: defaultMountOptions.props,
        global: {
          renderStubDefaultSlot: true, // enables slots content rendering with shallowMount
        },
      });
      expect(
        wrapper.get(usernameInputSelector).attributes()
      ).not.toHaveProperty('state');
    });
    it('should render passwordInput without "state" attr set by default', async () => {
      const wrapper = shallowMount(LoginPart, {
        props: defaultMountOptions.props,
        global: {
          renderStubDefaultSlot: true, // enables slots content rendering with shallowMount
        },
      });
      expect(
        wrapper.get(passwordInputSelector).attributes()
      ).not.toHaveProperty('state');
    });
    it('should render rememberMeInput with "checked" attr set to "true" by default', () => {
      const wrapper = shallowMount(LoginPart, {
        props: defaultMountOptions.props,
        global: {
          renderStubDefaultSlot: true, // enables slots content rendering with shallowMount
        },
      });
      expect(wrapper.get(rememberMeInputSelector).attributes('checked')).toBe(
        'true'
      );
    });
  });
  describe('User Interactions', () => {
    describe('username input', () => {
      it('empty username form submit', async () => {
        const wrapper = mount(LoginPart, defaultMountOptions);

        await wrapper
          .get('input[name=loginPassword]')
          .setValue(LoginRequestBodyMock.password);

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

        // should not emit submit event
        expect(wrapper.emitted()).not.toHaveProperty('submit');
      });
    });
    describe('password input', () => {
      it('empty password form submit', async () => {
        const wrapper = mount(LoginPart, defaultMountOptions);

        await wrapper
          .get('input[name=loginUsername]')
          .setValue(LoginRequestBodyMock.username);

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

        // should not emit submit event
        expect(wrapper.emitted()).not.toHaveProperty('submit');
      });
    });
    it('pageForm closeError event - should emit closeError event', async () => {
      const wrapper = mount(LoginPart, defaultMountOptions);

      await (wrapper.getComponent(pageFormSelector) as VueWrapper).vm.$emit(
        'closeError'
      );
      expect(wrapper.emitted()).toHaveProperty('closeError');
      expect(wrapper.emitted('closeError')).toHaveLength(1);
    });
    it('empty form submit', async () => {
      const wrapper = mount(LoginPart, {
        props: defaultMountOptions.props,
        global: {
          stubs: {
            SBUsernameInput: true,
            SBConfidentialInput: true,
          },
        },
      });
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
      expect(wrapper.get(passwordInputSelector).attributes('state')).toBe(
        'error'
      );

      // should not emit submit event
      expect(wrapper.emitted()).not.toHaveProperty('submit');
    });
    it('valid form submit', async () => {
      const wrapper = mount(LoginPart, defaultMountOptions);
      // toggle rememberMe input to test it too
      await wrapper.get('[role="checkbox"]').trigger('click');
      await wrapper
        .get('input[name=loginUsername]')
        .setValue(LoginRequestBodyMock.username);
      await wrapper
        .get('input[name=loginPassword]')
        .setValue(LoginRequestBodyMock.password);

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

      // should emit submit event with typed values
      expect(wrapper.emitted()).toHaveProperty('submit');
      expect(wrapper.emitted('submit')).toHaveLength(1);
      expect(wrapper.emitted('submit')![0][0]).toStrictEqual({
        username: LoginRequestBodyMock.username,
        password: LoginRequestBodyMock.password,
        // false, since we've toggled it
        refresh: false,
      });
    });
  });
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(LoginPart, {
      props: defaultMountOptions.props,
      global: {
        renderStubDefaultSlot: true, // enables slots content rendering with shallowMount
      },
    });
    expect(wrapper.element).toMatchInlineSnapshot(`
      <page-form-stub
        buttontext="Войти"
        data-testid="pageForm"
        errorstate="true"
        errorstatus="500"
        footerhint="Новый пользователь?"
        footerlinktitle="Регистрация"
        footerto="/register"
        pending="true"
        title="Вход"
      >
        <s-b-username-input-stub
          data-testid="usernameInput"
          debounce="false"
          disabled="false"
          icon="true"
          name="loginUsername"
          size="sm"
        />
        <s-b-confidential-input-stub
          autocomplete="off"
          data-testid="passwordInput"
          debounce="false"
          disabled="false"
          icon="true"
          label="Введите пароль"
          name="loginPassword"
          size="sm"
        />
        <div
          class="flex items-center justify-between"
        >
          <validation-error-output-stub
            data-testid="validationErrorOutputComponent"
            errors=""
          />
          <s-b-checkbox-input-stub
            checked="true"
            data-testid="rememberMeInput"
            disabled="false"
            label="Сохранить вход?"
            name="loginRememberMe"
            position="left"
            size="sm"
          />
        </div>
      </page-form-stub>
    `);
  });
});
