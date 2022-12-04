<template>
    <form @submit.prevent="register">
        <input type="text" v-model="registrationData.username">
        <input type="text" v-model="registrationData.email">
        <input type="text" v-model="registrationData.password">
        <input type="text" v-model="registrationData.passwordConfirm">
        <button type="submit">Зарегистрироваться</button>
    </form>
</template>
<script setup lang="ts">
import axios from 'axios'
const registrationData = reactive<{
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
const register = async () => {
    const res = await axios.post('http://localhost:5000/api/register', registrationData);
}
</script>