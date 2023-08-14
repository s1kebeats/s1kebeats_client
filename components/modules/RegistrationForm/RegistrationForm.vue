<template>
  <PageForm
    title="Регистрация"
    :pending="registrationFormState.pending"
    button-text="Зарегистрироваться"
    footer-hint="Уже есть аккаунт?"
    footer-link-title="Вход"
    footer-to="/login"
    :error-state="registrationFormState.error"
    :error-status="null"
    @submit-form="submitRegistrationForm"
    @close-error="closeErrorPopUp"
    data-testid="pageForm"
  >
    <UsernameInput
      :debounce="true"
      name="registrationUsername"
      size="sm"
      :state="
        v$.username.$error && !v$.username.$pending
          ? 'error'
          : registrationFormState.data.username
          ? 'success'
          : null
      "
      @update-value="
        ($event: string) => {
          registrationFormState.data.username = $event;
        }
      "
      data-testid="usernameInput"
    />
    <EmailInput
      size="sm"
      name="registrationEmail"
      :state="
        v$.email.$error
          ? 'error'
          : registrationFormState.data.email
          ? 'success'
          : null
      "
      :debounce="true"
      @update-value="
        ($event: string) => {
          registrationFormState.data.email = $event;
        }
      "
      data-testid="emailInput"
    />
    <ConfidentialInput
      size="sm"
      name="registrationPassword"
      label="Введите пароль"
      :debounce="true"
      @update-value="
        ($event: string) => {
          registrationFormState.data.password = $event;
        }
      "
      :state="
        v$.password.$error
          ? 'error'
          : registrationFormState.data.password
          ? 'success'
          : null
      "
      data-testid="passwordInput"
    />
    <ConfidentialInput
      size="sm"
      name="registrationPasswordConfirm"
      label="Введите пароль ещё раз"
      :debounce="true"
      @update-value="
        ($event: string) => {
          registrationFormState.data.passwordConfirm = $event;
        }
      "
      :state="
        v$.passwordConfirm.$error
          ? 'error'
          : registrationFormState.data.passwordConfirm
          ? 'success'
          : null
      "
      data-testid="passwordConfirmInput"
    />
    <ValidationErrorOutput
      :errors="v$.$errors"
      data-testid="validationErrorOutput"
    />
  </PageForm>
</template>
<script setup lang="ts">
import PageForm from '@/components/PageForm';
import ValidationErrorOutput from '@/components/ui/ValidationErrorOutput';
import {
  UsernameInput,
  EmailInput,
  ConfidentialInput,
} from '@s1kebeats/s1kebeats-ui';
import { useVuelidate } from '@vuelidate/core';
import {
  email,
  minLength,
  required,
  sameAs,
  helpers,
} from '@vuelidate/validators';
import { register } from './api';
import useUiStore from '@/stores/ui';
import {
  noSpecialChars,
  usernameAvailable,
  withCapitalLetter,
  withDigit,
} from './helpers/validators';

const uiStore = useUiStore();

const registrationFormState = reactive({
  data: {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  },
  error: false,
  pending: false,
});

const registrationRules = computed(() => {
  return {
    username: {
      required: helpers.withMessage('Введите имя пользователя', required),
      noSpecialChars: helpers.withMessage(
        'Введите имя пользователя без спец. символов',
        noSpecialChars
      ),
      available: helpers.withMessage(
        'Имя пользователя занято',
        helpers.withAsync(usernameAvailable)
      ),
    },
    email: {
      required: helpers.withMessage('Введите электронную почту', required),
      email: helpers.withMessage('Введите настоящую электронную почту', email),
    },
    password: {
      required: helpers.withMessage('Введите пароль', required),
      minLength: helpers.withMessage(
        'Минимальная длина пароля: 8 символов',
        minLength(8)
      ),
      withDigit: helpers.withMessage(
        'Пароль должен содержать цифру',
        withDigit
      ),
      withCapitalLetter: helpers.withMessage(
        'Пароль должен содержать заглавную букву',
        withCapitalLetter
      ),
    },
    passwordConfirm: {
      required: helpers.withMessage('Введите пароль еще раз', required),
      sameAs: helpers.withMessage(
        'Пароли не совпадают',
        sameAs(registrationFormState.data.password)
      ),
    },
  };
});

const v$ = useVuelidate(registrationRules, registrationFormState.data, {
  // runs validation on input instead of submit
  $autoDirty: true,
  // stops validation from being called on init
  $lazy: true,
});

async function submitRegistrationForm() {
  const result = await v$.value.$validate();
  if (result) {
    try {
      registrationFormState.error = false;
      registrationFormState.pending = true;

      await register(
        registrationFormState.data.username,
        registrationFormState.data.email,
        registrationFormState.data.password
      );

      uiStore.setLoading(true);
      await navigateTo('/login');
      setTimeout(() => uiStore.setLoading(false), 200);
    } catch (error: any) {
      registrationFormState.error = true;
    } finally {
      registrationFormState.pending = false;
    }
  }
}

function closeErrorPopUp() {
  registrationFormState.error = false;
}
</script>
