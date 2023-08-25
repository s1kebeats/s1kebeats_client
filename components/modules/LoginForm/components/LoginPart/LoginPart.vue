<template>
  <PageForm
    title="Вход"
    :pending="isSubmitting || apiSubmitting"
    button-text="Войти"
    footer-hint="Новый пользователь?"
    footer-link-title="Регистрация"
    footer-to="/register"
    :error-state="errorState"
    :error-status="errorStatus"
    @submit-form="submitLoginForm"
    @close-error="emit('closeError')"
    data-testid="pageForm"
  >
    <UsernameInput
      name="loginUsername"
      size="sm"
      v-bind="username"
      data-testid="usernameInput"
    />
    <ConfidentialInput
      size="sm"
      name="loginPassword"
      label="Введите пароль"
      v-bind="password"
      data-testid="passwordInput"
    />
    <div class="flex items-center justify-between">
      <ValidationErrorOutput
        :errors="Object.values(errors)"
        data-testid="validationErrorOutputComponent"
      />
      <CheckboxInput
        :checked="true"
        size="sm"
        name="loginRememberMe"
        label="Сохранить вход?"
        @update:value="
          ($event: boolean) => {
            rememberMe = $event;
          }
        "
        data-testid="rememberMeInput"
      />
    </div>
  </PageForm>
</template>
<script setup lang="ts">
import PageForm from '@/components/PageForm';
import ValidationErrorOutput from '@/components/ui/ValidationErrorOutput';
import {
  UsernameInput,
  ConfidentialInput,
  CheckboxInput,
} from '@s1kebeats/s1kebeats-ui';

import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import validationMessages from '@/components/shared/validationMessages';
import { LoginRequestBody } from '@/api/models/requestBodies';

const props = defineProps<{
  errorState: boolean;
  errorStatus: number | null;
  apiSubmitting: boolean;
}>();
const emit = defineEmits<{
  (e: 'submit', data: LoginRequestBody): void;
  (e: 'closeError'): void;
}>();

const schema = toTypedSchema(
  object({
    username: string().required(validationMessages.username.required),
    password: string().required(validationMessages.password.required),
  })
);
const {
  values,
  defineComponentBinds,
  errors,
  meta,
  handleSubmit,
  isSubmitting,
} = useForm({
  validationSchema: schema,
});
const requestError = reactive<{
  state: boolean;
  status: number | null;
}>({
  state: false,
  status: null,
});
const rememberMe = ref(true);

const username = defineComponentBinds('username', {
  model: 'value',
  mapProps: () => ({
    state:
      errors.value.username && !meta.value.pending
        ? 'error'
        : values.username
        ? 'success'
        : null,
  }),
});
const password = defineComponentBinds('password', {
  model: 'value',
  mapProps: () => ({
    state: errors.value.password ? 'error' : values.password ? 'success' : null,
  }),
});
const submitLoginForm = handleSubmit(async (values) => {
  emit('submit', {
    username: values.username,
    password: values.password,
    refresh: rememberMe.value,
  });
});
</script>
