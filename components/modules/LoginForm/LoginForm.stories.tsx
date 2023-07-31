import PageForm from './PageForm.vue';
import {
  UsernameInput,
  ConfidentialInput,
  CheckboxInput,
} from '@s1kebeats/s1kebeats-ui';
import type { Meta } from '@storybook/vue3';

const meta: Meta<typeof PageForm> = {
  component: PageForm,
};

export default meta;

export const Presentation = () => (
  <PageForm
    title="Вход"
    pending={false}
    button-text="Войти"
    footer-hint="Новый пользователь?"
    footer-link-title="Регистрация"
    footer-to="/register"
    error-state={false}
    error-status={null}
  >
    <UsernameInput size="sm" name="loginUsername" />
    <ConfidentialInput size="sm" name="loginPassword" label="Введите пароль" />
    <div class="w-full flex items-center justify-between">
      <CheckboxInput
        class="grow justify-end"
        checked={true}
        size="sm"
        name="loginRememberMe"
        label="Сохранить вход?"
      />
    </div>
  </PageForm>
);
