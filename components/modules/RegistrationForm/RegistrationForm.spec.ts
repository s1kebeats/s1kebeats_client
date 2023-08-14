import RegistrationForm from './RegistrationForm.vue';
import { describe, expect, it, vi } from 'vitest';
import { VueWrapper, mount, shallowMount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';

const pageFormSelector = '[data-testid=pageForm]';
const usernameInputSelector = '[data-testid=usernameInput]';
const emailInputSelector = '[data-testid=emailInput]';
const passwordInputSelector = '[data-testid=passwordInput]';
const passwordConfirmInputSelector = '[data-testid=passwordConfirmInput]';
const validationErrorOutputSelector = '[data-testid=validationErrorOutput]';

import Vuelidate from '@vuelidate/core'

describe('RegistrationForm', () => {
  beforeAll(() => {
    setActivePinia(createPinia());
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  describe('state', () => {
    it('pending - should render PageForm with "false" pending attr by default', () => {
      const wrapper = shallowMount(RegistrationForm)
      expect(wrapper.get(pageFormSelector).attributes('pending')).toBe("false")
    })
    it('error - should render PageForm without error-state attr by default', () => {
      const wrapper = shallowMount(RegistrationForm)
      expect(wrapper.get(pageFormSelector).attributes()).not.toHaveProperty('error-state')
    })
    describe('validation', () => {
      it('should render usernameInput without "state" attr set by default', () => {
        const wrapper = shallowMount(RegistrationForm, {
          // enables slots content rendering with shallowMount
          global: {
            renderStubDefaultSlot: true
          }
        })
        expect(wrapper.get(usernameInputSelector).attributes()).not.toHaveProperty('state')
      })
      it('should render emailInput without "state" attr set by default', () => {
        const wrapper = shallowMount(RegistrationForm, {
          // enables slots content rendering with shallowMount
          global: {
            renderStubDefaultSlot: true
          }
        })
        expect(wrapper.get(emailInputSelector).attributes()).not.toHaveProperty('state')
      })
      it('should render passwordInput without "state" attr set by default', () => {
        const wrapper = shallowMount(RegistrationForm, {
          // enables slots content rendering with shallowMount
          global: {
            renderStubDefaultSlot: true
          }
        })
        expect(wrapper.get(passwordInputSelector).attributes()).not.toHaveProperty('state')
      })
      it('should render passwordConfirmInput without "state" attr set by default', () => {
        const wrapper = shallowMount(RegistrationForm, {
          // enables slots content rendering with shallowMount
          global: {
            renderStubDefaultSlot: true
          }
        })
        expect(wrapper.get(passwordConfirmInputSelector).attributes()).not.toHaveProperty('state')
      })
      it('should render validationErrorOutput without errors by default', () => {
        const wrapper = shallowMount(RegistrationForm, {
          // enables slots content rendering with shallowMount
          global: {
            renderStubDefaultSlot: true
          }
        })
        expect(wrapper.get(validationErrorOutputSelector).attributes('errors')).toBeFalsy()
      })
    })
  })
  describe('User Interactions', () => {
    describe("PageForm submit-form event on empty form", () => {
      it.only('should validate form and set usernameInput "state" attr to "error"', async () => {
        const wrapper = shallowMount(RegistrationForm, {
          // enables slots content rendering with shallowMount
          global: {
            renderStubDefaultSlot: true,
            plugins: [Vuelidate]
          }
        })

        // await wrapper.get('[data-testid=actionButton]').trigger('click');
        await (
          wrapper.getComponent(pageFormSelector) as VueWrapper
        ).vm.$emit('submitForm');

        expect(wrapper.get(usernameInputSelector).attributes('state')).toBe('error')
      })
      it('should validate form and set emailInputSelector "state" attr to "error"', async () => {
        const wrapper = shallowMount(RegistrationForm, {
          // enables slots content rendering with shallowMount
          global: {
            renderStubDefaultSlot: true
          }
        })
  
        await (
          wrapper.getComponent(pageFormSelector) as VueWrapper
        ).vm.$emit('submitForm');
  
        expect(wrapper.get(emailInputSelector).attributes('state')).toBe('error')
      })
      it('should validate form and set passwordInputSelector "state" attr to "error"', async () => {
        const wrapper = shallowMount(RegistrationForm, {
          // enables slots content rendering with shallowMount
          global: {
            renderStubDefaultSlot: true
          }
        })
  
        await (
          wrapper.getComponent(pageFormSelector) as VueWrapper
        ).vm.$emit('submitForm');
  
        expect(wrapper.get(passwordInputSelector).attributes('state')).toBe('error')
      })
      it('should validate form and set passwordConfirmInputSelector "state" attr to "error"', async () => {
        const wrapper = shallowMount(RegistrationForm, {
          // enables slots content rendering with shallowMount
          global: {
            renderStubDefaultSlot: true
          }
        })
  
        await (
          wrapper.getComponent(pageFormSelector) as VueWrapper
        ).vm.$emit('submitForm');
  
        expect(wrapper.get(passwordConfirmInputSelector).attributes('state')).toBe('error')
      })
      it('should validate form and set validationErrorOutput "error" attr to array of errors', async () => {
        const wrapper = shallowMount(RegistrationForm, {
          // enables slots content rendering with shallowMount
          global: {
            renderStubDefaultSlot: true
          }
        })
  
        await (
          wrapper.getComponent(pageFormSelector) as VueWrapper
        ).vm.$emit('submitForm');
  
        expect(wrapper.get(validationErrorOutputSelector).attributes('errors')).toBe('f')
      })
    })
  })

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
