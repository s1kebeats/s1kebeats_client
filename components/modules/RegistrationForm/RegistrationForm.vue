<template>
  <form
    @submit.prevent="submitRegistrationForm"
    class="relative flex flex-col w-full"
  >
    <UiFormRequestErrorOutput
      :open="registrationFormState.error"
      @close="
        () => {
          registrationFormState.error = false;
        }
      "
    />
    <ConfirmEmailPopUp :open="registrationFormState.success" />
    <div
      class="flex flex-col gap-3 mb-3"
      :class="!v$.$errors.length ? 'pb-8' : ''"
    >
      <AppUsernameInput
        :required="true"
        autocomplete="off"
        name="registrationUsername"
        :class="v$.username.$error ? '!border-red-500' : ''"
        @update-value="($event: string) => { registrationFormState.data.username = $event }"
      />
      <EmailInput
        :required="true"
        autocomplete="off"
        :class="v$.email.$error ? '!border-red-500' : ''"
        @update-value="($event: string) => { registrationFormState.data.email = $event }"
      />
      <AppConfidentionalInput
        :required="true"
        autocomplete="off"
        title="Пароль"
        name="registrationPassword"
        placeholder="Введите пароль"
        :class="v$.password.$error ? '!border-red-500' : ''"
        @update-value="($event: string) => { registrationFormState.data.password = $event }"
      />
      <AppConfidentionalInput
        autocomplete="off"
        title="Подтверждение пароля"
        name="registrationPasswordConfirm"
        placeholder="Введите пароль ещё раз"
        :class="v$.passwordConfirm.$error ? '!border-red-500' : ''"
        @update-value="($event: string) => { registrationFormState.data.passwordConfirm = $event }"
        :required="true"
      />
      <UiFormValidationErrorOutput :v="v$" />
    </div>
    <UiLoadingButton :pending="registrationFormState.pending">
      Зарегистрироваться
    </UiLoadingButton>
  </form>
</template>
<script setup lang="ts">
import ConfirmEmailPopUp from './components/ConfirmEmailPopUp.vue';
import EmailInput from './components/EmailInput.vue';
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

const registrationFormState = reactive<{
  data: {
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
  };
  error: boolean;
  pending: boolean;
  success: boolean;
}>({
  data: {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  },
  error: false,
  pending: false,
  success: false,
});

const registrationRules = computed(() => {
  return {
    username: {
      required: helpers.withMessage('Заполните поля', required),
      available: helpers.withMessage(
        'Имя пользователя занято',
        helpers.withAsync(usernameAvailable)
      ),
    },
    email: {
      required: helpers.withMessage('Заполните поля', required),
      email: helpers.withMessage('Введите настоящую электронную почту', email),
    },
    password: {
      required: helpers.withMessage('Заполните поля', required),
      minLength: helpers.withMessage(
        'Минимальная длина пароля: 8 символов',
        minLength(8)
      ),
      withDigit: helpers.withMessage('Номер должен содержать цифру', withDigit),
      withCapitalLetter: helpers.withMessage(
        'Номер должен содержать заглавную букву',
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

      registrationFormState.success = true;
    } catch (error: any) {
      registrationFormState.error = true;
    } finally {
      registrationFormState.pending = false;
    }
  }
}
</script>
