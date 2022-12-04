<template>
    <form @submit.prevent="register" class="flex flex-col w-[500px]">
        <input type="text" v-model="registrationState.username">
        <div v-if="v$.username.$error">Name field has an error.</div>
        <input type="text" v-model="registrationState.email">
        <div v-if="v$.email.$error" class="bg-red">Name field has an error.</div>
        <input type="text" v-model="registrationState.password">
        <div v-if="v$.password.$error">Name field has an error.</div>
        <input type="text" v-model="registrationState.passwordConfirm">
        <div v-if="v$.passwordConfirm.$error">Name field has an error.</div>
        <button type="submit" class="">Зарегистрироваться</button>
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
const v$ = useVuelidate(registrationRules, registrationState)
const register = async () => {
    // const res = await axios.post('http://localhost:5000/api/register', {
    //     username: registrationState.username,
    //     email: registrationState.email,
    //     password: registrationState.password,
    // });
}
</script>