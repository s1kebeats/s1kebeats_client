<template>
  <UiProfileImage v-if="authStore.authorized" />
  <Icon v-else name="ic:round-account-circle" color="#e5e7eb" size="32px" />
</template>
<script setup lang="ts">
import UiProfileImage from './ProfileImage.vue';
import useAuthStore from '~~/stores/auth';

const authStore = useAuthStore();
</script>
