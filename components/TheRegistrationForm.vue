<template>
  <form @submit.prevent="register" class="flex flex-col w-full">
    <div
      class="flex flex-col gap-3 mb-3"
      :class="!v$.$errors.length ? 'pb-8' : ''"
    >
      <BaseTitledInput
        :debounce="true"
        :class="v$.email.$error ? 'border-red-500' : ''"
        @update-value="updateRegistrationState('email', $event)"
        type="email"
        title="Электронная почта"
        placeholder="Введите электронную почту"
        :value="registrationState.email"
      />
      <BasePasswordInput
        :class="v$.passwordConfirm.$error ? 'border-red-500' : ''"
        @update-value="updateRegistrationState('passwordConfirm', $event)"
        title="Подтверждение пароля"
        placeholder="Введите пароль ещё раз"
        :value="registrationState.passwordConfirm"
      />
      <BaseTitledInput
        :debounce="true"
        :class="v$.username.$error ? 'border-red-500' : ''"
        @update-value="updateRegistrationState('username', $event)"
        title="Имя пользователя"
        placeholder="Введите имя пользователя"
        :value="registrationState.username"
      />
      <BasePasswordInput
        :class="v$.password.$error ? 'border-red-500' : ''"
        @update-value="updateRegistrationState('password', $event)"
        title="Пароль"
        placeholder="Введите имя пароль"
        :value="registrationState.password"
      />
      <BaseFormErrorOutput :v$="v$" />
    </div>
    <BaseButton v-if="!registrationError" type="submit"
      >Зарегистрироваться</BaseButton
    >
    <BaseButton v-if="registrationError" class="bg-red-500 cursor-default"
      >Произошла непредвиденная ошибка</BaseButton
    >
  </form>
</template>
<script setup lang="ts">
import axios, { AxiosError } from 'axios';
import { useVuelidate } from '@vuelidate/core';
import { useUserStore } from '~~/stores/user';
import {
  email,
  minLength,
  required,
  sameAs,
  helpers,
} from '@vuelidate/validators';
const userStore = useUserStore();
const registrationError = ref();
const registrationState = reactive<{
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}>({
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
});
const passwordComplexity = (param: string): boolean => {
  return /\d/.test(param) && /[A-Z]/.test(param);
};
const usernameNotAvailable = async (param: string): Promise<boolean> => {
  try {
    const res = await axios.get(`http://localhost:5000/api/author/${param}`);
    return false;
  } catch (error) {
    return true;
  }
};
const registrationRules = computed(() => {
  return {
    username: {
      required: helpers.withMessage('Заполните поля', required),
      available: helpers.withMessage(
        'Имя пользователя занято',
        helpers.withAsync(usernameNotAvailable)
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
      complexity: helpers.withMessage(
        'Пароль должен содержать хотя бы одну цифру и заглавную букву',
        passwordComplexity
      ),
    },
    passwordConfirm: {
      required: helpers.withMessage('Заполните поля', required),
      sameAs: helpers.withMessage(
        'Пароли не совпадают',
        sameAs(registrationState.password)
      ),
    },
  };
});
const v$ = useVuelidate(registrationRules, registrationState, {
  $autoDirty: true,
  $lazy: true,
});
const updateRegistrationState = (
  key: keyof typeof registrationState,
  value: string
) => {
  registrationState[key] = value;
};
const register = async () => {
  const result = await v$.value.$validate();
  if (result) {
    try {
      const res = await userStore.register(
        registrationState.username,
        registrationState.email,
        registrationState.password
      );
      await navigateTo('/login');
    } catch (error) {
      registrationError.value = (error as AxiosError).response?.status;
    }
  }
};
</script>
