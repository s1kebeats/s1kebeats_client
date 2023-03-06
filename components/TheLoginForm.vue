<template>
  <form
    @submit.prevent="submitLoginForm"
    class="relative flex flex-col w-full gap-3"
  >
    <BaseFormErrorPopUp
      :open="loginFormState.error.state"
      :code="loginFormState.error.code"
      @close="closeErrorPopUp"
    />
    <BaseTitledInput
      :class="v$.username.$error ? '!border-red-500' : ''"
      @update-value="($event: string) => { loginFormState.data.username = $event }"
      title="Имя пользователя"
      placeholder="Введите имя пользователя"
      :value="loginFormState.data.username"
    />
    <BasePasswordInput
      :class="v$.password.$error ? '!border-red-500' : ''"
      @update-value="($event: string) => { loginFormState.data.password = $event }"
      title="Пароль"
      placeholder="Введите пароль"
      :value="loginFormState.data.password"
    />
    <div class="flex items-center h-5">
      <BaseFormErrorOutput :v$="v$" />
      <div class="grow flex items-center justify-end gap-2">
        <label for="save" class="text-xs">Сохранить вход?</label>
        <BaseCheckboxInput
          :value="loginFormState.data.rememberMe"
          @update-value="($event: boolean) => { loginFormState.data.rememberMe = $event }"
        />
      </div>
    </div>
    <BaseButton
      type="submit"
      class="relative flex items-center justify-center h-[36px]"
    >
      <transition name="spinner">
        <div v-show="loginFormState.pending" class="absolute w-full bg-black">
          <BaseLoadinSpinner key="spinner" />
        </div>
      </transition>
      <span key="span">Войти</span>
    </BaseButton>
  </form>
</template>
<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
import { useUserStore } from '~~/stores/user';

const userStore = useUserStore();

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

      await userStore.login(
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
<style lang="scss" scoped>
.spinner-enter-active,
.spinner-leave-active {
  transition: opacity 0.2s ease;
}
.spinner-enter-from,
.spinner-leave-to {
  opacity: 0;
}
</style>
