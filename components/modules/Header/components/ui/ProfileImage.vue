<template>
  <UiApiImage
    v-if="authStore.user!.image"
    :src="authStore.user!.image"
    class="rounded-full border-[1px] w-[32px] h-[32px]"
    width="32px"
    height="32px"
    alt="Profile Image"
    data-testid="profile-image"
  />
  <div
    v-else
    class="green-bg rounded-full w-[32px] h-[32px] flex items-center justify-center text-lg text-white"
    data-testid="authorized-icon"
  >
    {{ authStore.user!.username.charAt(0).toUpperCase() }}
  </div>
</template>
<script setup lang="ts">
import useAuthStore from '@/stores/auth';

const authStore = useAuthStore();
</script>
<style>
.green-bg {
  background-image: linear-gradient(to bottom, rgba(0, 255, 21, 0.8), #00ff4c8c),
    url('~/assets/images/profile-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
