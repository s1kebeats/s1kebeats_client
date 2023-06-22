import app from './app.vue';

describe('LoginFooter', () => {
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(LoginFooter);
    expect(wrapper.get(loginFooterSelector)).toMatchInlineSnapshot(`
            DOMWrapper {
              "isDisabled": [Function],
              "wrapperElement": <footer
                class="text-sm flex items-center gap-2"
                data-testid="loginFooter"
              >
                <nuxt-link
                  class="text-black font-semibold transition-all hover:brightness-[75%]"
                  to="/login"
                >
                  Забыли пароль?
                </nuxt-link>
                | 
                <nuxt-link
                  class="text-[#7945fc] font-semibold transition-all hover:brightness-[75%]"
                  to="/register"
                >
                  Регистрация
                </nuxt-link>
              </footer>,
            }
          `);
  });
});
