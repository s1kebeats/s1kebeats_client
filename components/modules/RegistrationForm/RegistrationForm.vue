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
  >
    <UsernameInput
      :debounce="true"
      name="registrationUsername"
      size="sm"
      :state="
        v$.username.$error
          ? 'error'
          : registrationFormState.data.username
          ? 'success'
          : null
      "
      @update-value="($event: string) => { registrationFormState.data.username = $event }"
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
      @update-value="($event: string) => { registrationFormState.data.email = $event }"
    />
    <ConfidentialInput
      size="sm"
      name="registrationPassword"
      label="Введите пароль"
      @update-value="($event: string) => { registrationFormState.data.password = $event }"
      :state="
        v$.password.$error
          ? 'error'
          : registrationFormState.data.password
          ? 'success'
          : null
      "
    />
    <ConfidentialInput
      size="sm"
      name="registrationPasswordConfirm"
      label="Введите пароль ещё раз"
      @update-value="($event: string) => { registrationFormState.data.passwordConfirm = $event }"
      :state="
        v$.passwordConfirm.$error
          ? 'error'
          : registrationFormState.data.passwordConfirm
          ? 'success'
          : null
      "
    />
    <UiFormValidationErrorOutput :errors="v$.$errors" />
  </PageForm>
</template>
<script setup lang="ts">
import PageForm from '@/components/modules/PageForm/PageForm.vue';
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
import usernameAvailable from './helpers/validators/usernameAvailable';
import withDigit from './helpers/validators/withDigit';
import withCapitalLetter from './helpers/validators/withCapitalLetter';
import register from './api/register';
import noSpecialChars from './helpers/validators/noSpecialChars';
import useUiStore from '@/stores/ui';

const uiStore = useUiStore();

const emit = defineEmits<{
  (e: 'success'): void;
}>();

const registrationFormState = reactive<{
  data: {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };
  error: boolean;
  pending: boolean;
}>({
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
      required: helpers.withMessage('Заполните поля', required),
      sameAs: helpers.withMessage(
        'Пароли не совпадают',
        sameAs(registrationFormState.data.password)
      ),
    },
  };
});

const v$ = useVuelidate(registrationRules, registrationFormState.data, {
  $autoDirty: true,
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
      emit('success');
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
