import LoginForm from './LoginForm.vue';
import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';

const loginFormSelector = '[data-testid=loginForm]';

describe('LoginForm', () => {
  it('snapshot - should match the snapshot', () => {
    const wrapper = shallowMount(LoginForm);
    expect(wrapper.get(loginFormSelector)).toMatchInlineSnapshot();
  });
});
