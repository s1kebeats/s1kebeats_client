<template>
  <div class="flex gap-[3%]">
    <template v-if="authStore.authorized">
      <UploadButton class="grow" />
      <LogoutButton data-testid="logoutButton" />
    </template>
    <template v-else>
      <LoginButton />
      <RegisterButton class="grow" />
    </template>
  </div>
</template>
<script setup lang="ts">
import LogoutButton from './ui/LogoutButton.vue';
import LoginButton from './ui/LoginButton.vue';
import RegisterButton from './ui/RegisterButton.vue';
import UploadButton from './ui/UploadButton.vue';
import useAuthStore from '@/stores/auth';
const authStore = useAuthStore();
</script>
