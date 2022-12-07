<template>
    <form @submit.prevent="register" class="flex flex-col w-[500px]">
        <input type="text" v-model="registrationState.username">
        <input type="text" v-model="registrationState.email">
        <input type="text" v-model="registrationState.password">
        <input type="text" v-model="registrationState.passwordConfirm">
        <button type="submit" class="">Зарегистрироваться</button>
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