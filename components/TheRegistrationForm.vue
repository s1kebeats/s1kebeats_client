<template>
    <form @submit.prevent="register" class="flex flex-col gap-5 w-[500px] bg-white rounded-lg px-10 py-5">
        <div class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold">Регистрация</h1>
            <h2 class="text-sm">Уже есть аккаунт? <nuxt-link to="/login" class="text-[#7945fc] hover:font-semibold transition-all">Войдите</nuxt-link></h2>
        </div>
        <BaseTitledInput title="Имя пользователя" placeholder="Введите имя пользователя" :value="registrationState.username" />
        <BaseTitledInput type="email" title="Электронная почта" placeholder="Введите электронную почту" :value="registrationState.email" />
        <BaseTitledInput type="password" title="Пароль" placeholder="Введите имя пароль" :value="registrationState.password">
            <!-- <SeePasswordButton /> -->
        </BaseTitledInput>
        <BaseTitledInput type="password" title="Подтверждение пароля" placeholder="Введите пароль ещё раз" :value="registrationState.passwordConfirm">
            <!-- <SeePasswordButton /> -->
        </BaseTitledInput>
        <button type="submit" class="bg-[#7945fc] text-white rounded-lg py-2 text-sm">Зарегистрироваться</button>
        <span v-for="error in v$.$errors" :key="error.$uid">
            {{ error.$property }} - {{  error.$message }}
        </span>
    </form>
</template>
<script setup lang="ts">
import axios from 'axios'
import { useVuelidate } from '@vuelidate/core'
import { email, minLength, required, sameAs } from '@vuelidate/validators'
const registrationState = reactive<{
    username: string;
    email: string;
    password: string;
    passwordConfirm: string;
}>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
})
const registrationRules = computed(() => {
    return {
        username: { required },
        email: { required, email },
        password: { required, minLength: minLength(8) },
        passwordConfirm: { required, sameAs: sameAs(registrationState.passwordConfirm) },
    }
})
const v$ = useVuelidate(registrationRules, registrationState, { $autoDirty: true, $lazy: true })
const register = async () => {
    const result = await v$.value.$validate()
    console.log(result)
    // const res = await axios.post('http://localhost:5000/api/register', {
    //     username: registrationState.username,
    //     email: registrationState.email,
    //     password: registrationState.password,
    // });
}
</script>