<template>
  <PresentationalAvatar
    :image="authStore.user!.image"
    :username="authStore.user!.username"
    v-if="authStore.authorized"
    data-testid="profileImage"
  />
  <div
    v-else
    class="bg-black rounded-full w-[32px] h-[32px] flex items-center justify-center desktop-text-lg text-white"
    data-testid="unauthorizedIcon"
  >
    ?
  </div>
</template>
<script setup lang="ts">
import { PresentationalAvatar } from '@s1kebeats/s1kebeats-ui';
import useAuthStore from '@/stores/auth';

const authStore = useAuthStore();
</script>
<style scoped>
.icon-bg {
  background-image: linear-gradient(to left, #7945fc, #473131),
    url('~/assets/images/profile-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
