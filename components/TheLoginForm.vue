<template>
    <form @submit.prevent="login" class="flex flex-col gap-5 w-[500px] bg-white rounded-lg px-10 py-5">
        <h1 class="text-2xl font-semibold">Регистрация</h1>
        <div class="h-[86px]">
            <BaseTitledInput @update-value="updateLoginState('username', $event)" title="Имя пользователя" placeholder="Введите имя пользователя" :value="loginState.username" />
        </div>
        <div class="h-[86px]">
            <BasePasswordInput @update-value="updateLoginState('password', $event)" title="Пароль" placeholder="Введите пароль" :value="loginState.password" />
        </div>
        <button type="submit" class="bg-[#7945fc] text-white rounded-lg py-2 text-sm">Войти</button>
    </form>
</template>
<script setup lang="ts">
import { useUserStore } from '../stores/user';
const userStore = useUserStore()
const loginState = reactive({
    username: '',
    password: ''
})
const updateLoginState = (key: keyof typeof loginState, value: string) => {
    loginState[key] = value;
}
const login = async () => {
    await userStore.login(loginState.username, loginState.password)
    await navigateTo('/')
}
</script>