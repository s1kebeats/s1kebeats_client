<template>
  <PageForm
    title="Регистрация"
    :pending="isSubmitting"
    button-text="Зарегистрироваться"
    footer-hint="Уже есть аккаунт?"
    footer-link-title="Вход"
    footer-to="/login"
    :error-state="requestError"
    :error-status="null"
    @submit-form="submitRegistrationForm"
    @close-error="closeErrorPopUp"
    data-testid="pageForm"
  >
    <UsernameInput
      :debounce="true"
      name="registrationUsername"
      size="sm"
      v-bind="username"
      data-testid="usernameInput"
    />
    <EmailInput
      size="sm"
      name="registrationEmail"
      v-bind="email"
      :debounce="true"
      data-testid="emailInput"
    />
    <ConfidentialInput
      size="sm"
      name="registrationPassword"
      label="Введите пароль"
      :debounce="true"
      v-bind="password"
      data-testid="passwordInput"
    />
    <ConfidentialInput
      size="sm"
      name="registrationPasswordConfirm"
      label="Введите пароль ещё раз"
      :debounce="true"
      v-bind="passwordConfirm"
      data-testid="passwordConfirmInput"
    />
    <ValidationErrorOutput
      :errors="Object.values(errors)"
      data-testid="validationErrorOutputComponent"
    />
  </PageForm>
</template>
<script setup lang="ts">
import { PageForm } from '@/components';
import { ValidationErrorOutput } from '@/components/ui';
import {
  UsernameInput,
  EmailInput,
  ConfidentialInput,
} from '@s1kebeats/s1kebeats-ui';

import { register } from './api';
import { useUiStore } from '@/stores';
import {
  noSpecialChars,
  usernameAvailable,
  withCapitalLetter,
  withDigit,
} from './helpers/validators';

import { useForm } from 'vee-validate';
import {
  ref as yupRef,
  object,
  string,
  type StringSchema,
  type ValidationError,
  type TestFunction,
} from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import validationMessages from '@/components/shared/validationMessages';
import * as EmailValidator from 'email-validator';
import { execWithTimeout } from '@/composables';

const uiStore = useUiStore();

function yupSequentialStringSchema(schemas: StringSchema[]) {
  return string().test(async (value, context) => {
    try {
      for (const schema of schemas) {
        await schema.validate(value);
      }
    } catch (error: unknown) {
      const message = (error as ValidationError).message;
      return context.createError({ message });
    }
    return true;
  });
}

const schema = toTypedSchema(
  object({
    username: yupSequentialStringSchema([
      string().required(validationMessages.username.required),
      string().test(
        'noSpecialChars',
        validationMessages.username.noSpecialChars,
        noSpecialChars as TestFunction<string | undefined, any>
      ),
      string().test(
        'available',
        validationMessages.username.available,
        usernameAvailable as TestFunction<string | undefined, any>
      ),
    ]),
    email: string()
      .required(validationMessages.email.required)
      .test('email', validationMessages.email.valid, EmailValidator.validate),
    password: string()
      .required(validationMessages.password.required)
      .min(8, validationMessages.password.min)
      .test('withDigit', validationMessages.password.withDigit, withDigit)
      .test(
        'withCapitalLetter',
        validationMessages.password.withCapitalLetter,
        withCapitalLetter
      ),
    passwordConfirm: string()
      .required(validationMessages.passwordConfirm.required)
      .oneOf([yupRef('password')], validationMessages.passwordConfirm.match),
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
const requestError = ref(false);
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
const email = defineComponentBinds('email', {
  model: 'value',
  mapProps: () => ({
    state: errors.value.email ? 'error' : values.email ? 'success' : null,
  }),
});
const password = defineComponentBinds('password', {
  model: 'value',
  mapProps: () => ({
    state: errors.value.password ? 'error' : values.password ? 'success' : null,
  }),
});
const passwordConfirm = defineComponentBinds('passwordConfirm', {
  model: 'value',
  mapProps: () => ({
    state: errors.value.passwordConfirm
      ? 'error'
      : values.passwordConfirm
      ? 'success'
      : null,
  }),
});
const submitRegistrationForm = handleSubmit(async (values) => {
  try {
    requestError.value = false;

    await register({
      username: values.username!,
      email: values.email,
      password: values.password,
    });

    uiStore.setLoading(true);
    await execWithTimeout(navigateTo('/login') as Promise<unknown>, 200);
    uiStore.setLoading(false);
  } catch (error: any) {
    requestError.value = true;
  }
});

function closeErrorPopUp() {
  requestError.value = false;
}
</script>
