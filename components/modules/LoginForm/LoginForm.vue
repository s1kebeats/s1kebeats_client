<template>
  <form
    @submit.prevent="submitLoginForm"
    class="relative flex flex-col w-full gap-3"
    data-testid="loginForm"
  >
    <AppFormRequestErrorOutput
      :open="loginFormState.error.state"
      :status="loginFormState.error.code"
      @close="closeErrorPopUp"
    />
    <template v-if="loginFormState.error.code === 403">
      <div></div>
    </template>
    <template v-else>
      <UsernameInput
        size="sm"
        :state="v$.username.$error ? 'error' : null"
        name="loginUsername"
        @update-value="($event: string) => { loginFormState.data.username = $event }"
      />
      <ConfidentialInput
        size="sm"
        name="loginPassword"
        label="Введите пароль"
        @update-value="($event: string) => { loginFormState.data.password = $event }"
        :state="v$.password.$error ? 'error' : null"
      />
      <div class="w-full flex items-center justify-between">
        <UiFormValidationErrorOutput :v="v$" />
        <CheckboxInput
          class="grow justify-end"
          :checked="true"
          size="sm"
          name="loginRememberMe"
          label="Сохранить вход?"
          @update-value="($event: boolean) => { loginFormState.data.rememberMe = $event }"
        />
      </div>
      <Button size="sm" :loading="loginFormState.pending"> Войти </Button>
    </template>
  </form>
</template>
<script setup lang="ts">
import {
  UsernameInput,
  ConfidentialInput,
  Button,
  CheckboxInput,
} from '@s1kebeats/s1kebeats-ui';
import { helpers, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import useAuthStore from '@/stores/auth';
import useUiStore from '@/stores/ui';

const authStore = useAuthStore();
const uiStore = useUiStore();

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

      await authStore.login(
        loginFormState.data.username,
        loginFormState.data.password,
        loginFormState.data.rememberMe
      );
      uiStore.setLoading(true);
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
