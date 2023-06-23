import RegistrationForm from './RegistrationForm.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

const registrationFormSelector = '[data-testid=registrationForm]';

describe('RegistrationForm', () => {
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(RegistrationForm);
    expect(wrapper.get(registrationFormSelector)).toMatchInlineSnapshot(`
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
