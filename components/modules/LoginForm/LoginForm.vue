<template>
  <LoginPart
    @close-error="closeErrorPopUp"
    @submit="onLoginSubmit"
    v-show="loginFormState.mode === 'login'"
    :error-state="loginFormState.error.state"
    :error-status="loginFormState.error.status"
    :api-submitting="loginFormState.pending"
    data-testid="loginPart"
  />
  <ActivationPart
    v-if="loginFormState.mode === 'activation'"
    @submit="onActivationSubmit"
    @close-error="closeErrorPopUp"
    :error-state="loginFormState.error.state"
    :error-status="loginFormState.error.status"
    :api-submitting="loginFormState.pending"
    data-testid="activationPart"
  />
</template>
<script setup lang="ts">
import { LoginRequestBody } from '@/api/models/requestBodies';
import { LoginPart, ActivationPart } from './components';

import { useAuthStore, useUiStore } from '@/stores';

const authStore = useAuthStore();
const uiStore = useUiStore();

const loginFormState = reactive<{
  mode: 'login' | 'activation';
  error: {
    state: boolean;
    status: number | null;
  };
  pending: boolean;
  data: LoginRequestBody;
}>({
  mode: 'login',
  error: {
    state: false,
    status: null,
  },
  pending: false,
  data: {} as LoginRequestBody,
});

async function onLoginSubmit(data: LoginRequestBody) {
  loginFormState.pending = true;
  try {
    await authStore.login(data);
    await onLoginSuccess();
  } catch (error: any) {
    if (error.response?.status === 403) {
      Object.assign(loginFormState.data, data);
      loginFormState.mode = 'activation';
      return;
    }
    loginFormState.error.state = true;
    if (error.response?.status) {
      loginFormState.error.status = error.response.status;
    }
  } finally {
    loginFormState.pending = false;
  }
}

async function onActivationSubmit(code: string) {
  loginFormState.pending = true;
  try {
    await authStore.activate(code);
    await authStore.login(loginFormState.data);
    await onLoginSuccess();
  } catch (error: any) {
    loginFormState.error.state = true;
    if (error.response?.status) {
      loginFormState.error.status = error.response.status;
    }
  } finally {
    loginFormState.pending = false;
  }
}

function closeErrorPopUp() {
  loginFormState.error.state = false;
  setTimeout(() => {
    loginFormState.error.status = null;
  }, 200);
}

async function onLoginSuccess() {
  uiStore.setLoading(true);
  await navigateTo('/');
  setTimeout(() => uiStore.setLoading(false), 200);
}
</script>
