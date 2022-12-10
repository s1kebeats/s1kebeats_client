<template>
    <form @submit.prevent="register" class="flex flex-col gap-5 w-[500px] bg-white rounded-lg px-10 py-5">
        <div class="flex flex-col gap-1">
            <h1 class="text-2xl font-semibold">Регистрация</h1>
            <h2 class="text-sm">Уже есть аккаунт? <nuxt-link to="/login" class="text-[#7945fc] hover:font-semibold transition-all">Войдите</nuxt-link></h2>
        </div>
        <div class="h-[86px]">
            <BaseTitledInput :debounce="true" :class="v$.username.$error ? 'border-red-500' : ''" @update-value="updateRegistrationState('username', $event)" title="Имя пользователя" placeholder="Введите имя пользователя" :value="registrationState.username" />
            <span v-if="v$.username.$error" class="text-xs text-red-500" >{{ 
                v$.username.$errors[0].$message
            }}</span>
        </div>
        <div class="h-[86px]">
            <BaseTitledInput :debounce="true" :class="v$.email.$error ? 'border-red-500' : ''" @update-value="updateRegistrationState('email', $event)" type="email" title="Электронная почта" placeholder="Введите электронную почту" :value="registrationState.email" />
            <span v-if="v$.email.$error" class="text-xs text-red-500" >{{ v$.email.$errors[0].$message }}</span>
        </div>
        <div class="h-[86px]">
            <BasePasswordInput :class="v$.password.$error ? 'border-red-500' : ''" @update-value="updateRegistrationState('password', $event)" title="Пароль" placeholder="Введите имя пароль" :value="registrationState.password" />
            <span v-if="v$.password.$error" class="text-xs text-red-500" >{{ v$.password.$errors[0].$message }}</span>
        </div>
        <div class="h-[86px]">
            <BasePasswordInput :class="v$.passwordConfirm.$error ? 'border-red-500' : ''" @update-value="updateRegistrationState('passwordConfirm', $event)" title="Подтверждение пароля" placeholder="Введите пароль ещё раз" :value="registrationState.passwordConfirm" />
            <span v-if="v$.passwordConfirm.$error" class="text-xs text-red-500" >{{ v$.passwordConfirm.$errors[0].$message }}</span>
        </div>
        <button type="submit" class="bg-[#7945fc] text-white rounded-lg py-2 text-sm">Зарегистрироваться</button>
    </form>
</template>
<script setup lang="ts">
import axios from 'axios'
import { useVuelidate } from '@vuelidate/core'
import { email, minLength, required, sameAs, helpers } from '@vuelidate/validators'
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
const passwordComplexity = (param: string): boolean => {
    return /\d/.test(param) && /[A-Z]/.test(param);
}
const usernameNotAvailable = async (param: string): Promise<boolean> => {
    try {
        const res = await axios.get(`http://localhost:5000/api/author/${param}`)
        return false
    } catch (error) {
        return true
    }
}
const registrationRules = computed(() => {
    return {
        username: { required: helpers.withMessage('Обязательное поле', required), available: helpers.withMessage('Имя пользователя занято', helpers.withAsync(usernameNotAvailable)) },
        email: { required: helpers.withMessage('Обязательное поле', required), email: helpers.withMessage('Введите настоящую электронную почту', email) },
        password: { required: helpers.withMessage('Обязательное поле', required), minLength: helpers.withMessage('Минимальная длина пароля: 8 символов', minLength(8)), complexity: helpers.withMessage('Пароль должен содержать хотя бы одну цифру и заглавную букву', passwordComplexity) },
        passwordConfirm: { required: helpers.withMessage('Обязательное поле', required), sameAs: helpers.withMessage('Пароли не совпадают', sameAs(registrationState.password)) },
    }
})
const v$ = useVuelidate(registrationRules, registrationState, { $autoDirty: true, $lazy: true })
const updateRegistrationState = (key: keyof typeof registrationState, value: string) => {
    registrationState[key] = value;
}
const register = async () => {
    const result = await v$.value.$validate()
    if (result) {
        if (await usernameNotAvailable(registrationState.username)) {
            const res = await axios.post('http://localhost:5000/api/register', {
                username: registrationState.username,
                email: registrationState.email,
                password: registrationState.password,
            });
            console.log(res.data)
        } else {
            console.log('username\'s taken')
        }
    }
}
</script>