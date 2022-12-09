<template>
    <form @submit.prevent="register" class="flex flex-col gap-5 w-[500px] bg-white rounded-lg px-10 py-5">
        <div class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold">Регистрация</h1>
            <h2 class="text-sm">Уже есть аккаунт? <nuxt-link to="/login" class="text-[#7945fc] hover:font-semibold transition-all">Войдите</nuxt-link></h2>
        </div>
        <BaseTitledInput :debounce="true" :class="v$.username.$error ? 'border-red-500' : ''" @update-value="updateRegistrationState('username', $event)" title="Имя пользователя" placeholder="Введите имя пользователя" :value="registrationState.username" />
        <span v-if="v$.username.$error">{{ v$.username.$errors[0].$message }}</span>
        <BaseTitledInput :class="v$.email.$error ? 'border-red-500' : ''" @update-value="updateRegistrationState('email', $event)" type="email" title="Электронная почта" placeholder="Введите электронную почту" :value="registrationState.email" />
        <span v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
        <BasePasswordInput :class="v$.password.$error ? 'border-red-500' : ''" @update-value="updateRegistrationState('password', $event)" title="Пароль" placeholder="Введите имя пароль" :value="registrationState.password" />
        <span v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
        <BasePasswordInput :class="v$.passwordConfirm.$error ? 'border-red-500' : ''" @update-value="updateRegistrationState('passwordConfirm', $event)" title="Подтверждение пароля" placeholder="Введите пароль ещё раз" :value="registrationState.passwordConfirm" />
        <span v-if="v$.passwordConfirm.$error">{{ v$.passwordConfirm.$errors[0].$message }}</span>
        <button type="submit" class="bg-[#7945fc] text-white rounded-lg py-2 text-sm">Зарегистрироваться</button>
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
        passwordConfirm: { required, sameAs: sameAs(registrationState.password) },
    }
})
const v$ = useVuelidate(registrationRules, registrationState, { $autoDirty: true, $lazy: true })
const updateRegistrationState = (key: keyof typeof registrationState, value: string) => {
    registrationState[key] = value;
}
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