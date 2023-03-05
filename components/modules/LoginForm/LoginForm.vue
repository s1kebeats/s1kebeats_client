<template>
  <form
    @submit.prevent="submitLoginForm"
    class="relative flex flex-col w-full gap-3"
  >
    <UiFormRequestErrorOutput
      :open="loginFormState.error.state"
      :status="loginFormState.error.code"
      @close="closeErrorPopUp"
    />
    <UsernameInput
      :class="v$.username.$error ? 'border-red-500' : ''"
      @update-value="($event: string) => { loginFormState.data.username = $event }"
    />
    <AppConfidentionalInput
      title="Пароль"
      name="password"
      placeholder="Введите пароль"
      :class="v$.password.$error ? 'border-red-500' : ''"
      @update-value="($event: string) => { loginFormState.data.password = $event }"
    />
    <div class="flex items-center h-5">
      <UiFormValidationErrorOutput :v="v$" />
      <RememberMeInput
        @update-value="($event: boolean) => { loginFormState.data.rememberMe = $event }"
      />
    </div>
    <UiLoadingButton :pending="loginFormState.pending"> Войти </UiLoadingButton>
  </form>
</template>
<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import UsernameInput from './components/UsernameInput.vue';
import RememberMeInput from './components/RememberMeInput.vue';
import LoginButton from './components/LoginButton.vue';
import login from './api/login';

const emit = defineEmits<{
  (e: 'success'): void;
}>();

const loginFormState = reactive<{
  data: {
    username: string;
    password: string;
    rememberMe: boolean;
  };
  error: {
    state: boolean;
    code: number | null;
  };
  pending: boolean;
}>({
  data: {
    username: '',
    password: '',
    rememberMe: true,
  },
  error: {
    state: false,
    code: null,
  },
  pending: false,
});

const loginRules = computed(() => {
  return {
    username: { required: helpers.withMessage('Заполните поля', required) },
    password: { required: helpers.withMessage('Заполните поля', required) },
  };
});

const v$ = useVuelidate(loginRules, loginFormState.data, {
  $autoDirty: true,
  $lazy: true,
});

function closeErrorPopUp() {
  loginFormState.error.state = false;
  setTimeout(() => {
    loginFormState.error.code = null;
  }, 200);
}

async function submitLoginForm() {
  const result = await v$.value.$validate();
  if (result) {
    try {
      loginFormState.pending = true;

      await login(
        loginFormState.data.username,
        loginFormState.data.password,
        loginFormState.data.rememberMe
      );

      emit('success');
    } catch (error: any) {
      loginFormState.error.state = true;
      if (error.response.status) {
        loginFormState.error.code = error.response.status;
      }
    } finally {
      loginFormState.pending = false;
    }
  }
}
</script>
