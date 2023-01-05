<template>
  <form @submit.prevent="submitLoginForm" class="flex flex-col w-full gap-3">
    <BaseTitledInput
      :class="v$.username.$error ? 'border-red-500' : ''"
      @update-value="($event: string) => { loginFormState.data.username = $event }"
      title="Имя пользователя"
      placeholder="Введите имя пользователя"
      :value="loginFormState.data.username"
    />
    <BasePasswordInput
      :class="v$.password.$error ? 'border-red-500' : ''"
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
      :class="loginFormState.errorStatus ? 'bg-red-500 cursor-default' : ''"
    >
      <span v-show="!loginFormState.errorStatus && !loginFormState.pending"
        >Войти</span
      >
      <BaseLoadinSpinner
        v-show="!loginFormState.errorStatus && loginFormState.pending"
      />
      <span v-show="loginFormState.errorStatus">
        {{
          loginErrorMessages[loginFormState.errorStatus]
            ? loginErrorMessages[loginFormState.errorStatus]
            : 'Произошла непредвиденная ошибка'
        }}
      </span>
    </BaseButton>
  </form>
</template>
<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';
const loginErrorMessages: {
  [key: string]: string;
} = {
  '401': 'Неверные данные для входа',
  '403': 'Электронная почта не подтверждена',
};

const emit = defineEmits<{
  (e: 'success'): void;
}>();

const loginFormState = reactive<{
  data: {
    username: string;
    password: string;
    rememberMe: boolean;
  };
  errorStatus: string;
  pending: boolean;
}>({
  data: {
    username: '',
    password: '',
    rememberMe: true,
  },
  errorStatus: '',
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

async function submitLoginForm() {
  const result = await v$.value.$validate();
  if (result) {
    try {
      loginFormState.errorStatus = '';
      loginFormState.pending = true;

      const user = await useLogin(
        loginFormState.data.username,
        loginFormState.data.password,
        loginFormState.data.rememberMe
      );

      emit('success');
    } catch (error: any) {
      loginFormState.errorStatus = error.value.status;
    } finally {
      loginFormState.pending = false;
    }
  }
}
</script>
