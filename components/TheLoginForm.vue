<template>
    <form @submit.prevent="login" class="flex flex-col gap-5 w-[500px] bg-white rounded-lg px-10 py-5">
        <h1 class="text-2xl font-semibold">Вход</h1>
        <div class="h-[86px]">
            <BaseTitledInput :class="v$.username.$error ? 'border-red-500' : ''" @update-value="updateLoginState('username', $event)" title="Имя пользователя" placeholder="Введите имя пользователя" :value="loginState.username" />
            <span v-if="v$.username.$error" class="text-xs text-red-500" >{{ v$.username.$errors[0].$message }}</span>
        </div>
        <div class="h-[86px]">
            <BasePasswordInput :class="v$.password.$error ? 'border-red-500' : ''" @update-value="updateLoginState('password', $event)" title="Пароль" placeholder="Введите пароль" :value="loginState.password" />
            <span v-if="v$.password.$error" class="text-xs text-red-500" >{{ v$.password.$errors[0].$message }}</span>
        </div>
        <button v-if="!loginError" type="submit" class="bg-[#7945fc] text-white rounded-lg py-2 text-sm">Войти</button>
        <div v-if="loginError" class="bg-red-500 w-[420px] rounded-lg text-white text-sm py-2 text-center">{{ loginError == '401' ? 'Неверные данные для входа' : 'Произошла непредвиденная ошибка' }}</div>
    </form>
</template>
<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators';
import { useUserStore } from '../stores/user';
import { useVuelidate } from '@vuelidate/core'
const userStore = useUserStore()
const loginError = ref()
const loginState = reactive({
    username: '',
    password: ''
})
const loginRules = computed(() => {
    return {
        username: { required: helpers.withMessage('Обязательное поле', required) },
        password: { required: helpers.withMessage('Обязательное поле', required) },
    }
})
const v$ = useVuelidate(loginRules, loginState, { $autoDirty: true, $lazy: true })
const updateLoginState = (key: keyof typeof loginState, value: string) => {
    if (loginError.value) {
        loginError.value = ''
    }
    loginState[key] = value;
}
const login = async () => {
    const result = await v$.value.$validate()
    if (result) {
        const error = await userStore.login(loginState.username, loginState.password)
        if (error) {
            loginError.value = error.response?.status;
        }
        // await navigateTo('/')
    }
}
</script>