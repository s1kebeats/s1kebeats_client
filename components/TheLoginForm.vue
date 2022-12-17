<template>
  <form
    @submit.prevent="login"
    class="flex flex-col w-full gap-3"
  >
      <BaseTitledInput
        :class="v$.username.$error ? 'border-red-500' : ''"
        @update-value="updateLoginState('username', $event)"
        title="Имя пользователя"
        placeholder="Введите имя пользователя"
        :value="loginState.username"
      />
      <BasePasswordInput
        :class="v$.password.$error ? 'border-red-500' : ''"
        @update-value="updateLoginState('password', $event)"
        title="Пароль"
        placeholder="Введите пароль"
        :value="loginState.password"
      />
      <div class="flex items-center h-5">
        <BaseFormErrorOutput :v$="v$" />
        <div class="grow flex items-center justify-end gap-2">
          <label for="save" class="text-xs">Сохранить вход?</label>
          <BaseCheckboxInput
            :value="loginState.save"
            @update-value="updateLoginSave"
          />
        </div>
      </div>
    <BaseButton v-if="!loginError" type="submit">Войти</BaseButton>
    <BaseButton v-if="loginError" class="bg-red-500 cursor-default">{{
      loginErrorMessages[loginError]
        ? loginErrorMessages[loginError]
        : 'Произошла непредвиденная ошибка'
    }}</BaseButton>
  </form>
</template>
<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useUserStore } from '../stores/user'
import { AxiosError } from 'axios'
const userStore = useUserStore()
const loginError = ref('')
const loginErrorMessages: {
  [key: string]: string
} = {
  '401': 'Неверные данные для входа',
  '403': 'Электронная почта не подтверждена',
}
const loginState = reactive<{
  [key: string]: string | boolean
  username: string
  password: string
  save: boolean
}>({
  username: '',
  password: '',
  save: true,
})
const loginRules = computed(() => {
  return {
    username: { required: helpers.withMessage('Заполните поля', required) },
    password: { required: helpers.withMessage('Заполните поля', required) },
  }
})
const v$ = useVuelidate(loginRules, loginState, {
  $autoDirty: true,
  $lazy: true,
})
const updateLoginState = (key: keyof typeof loginState, value: string) => {
  if (loginError.value) {
    loginError.value = ''
  }
  loginState[key] = value
}
const updateLoginSave = (value: boolean) => {
  loginState.save = value
}
const login = async () => {
  const result = await v$.value.$validate()
  if (result) {
    try {
      const res = await userStore.login(
        loginState.username,
        loginState.password,
        loginState.save
      )
      await navigateTo('/')
    } catch (error) {
      loginError.value = String((error as AxiosError).response?.status)
    }
  }
}
</script>
