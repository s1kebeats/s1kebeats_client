<template>
  <PresentationalAvatar
    v-if="authStore.authorized"
    :image="authStore.user!.image"
    :username="authStore.user!.username"
    size="sm"
    data-testid="presentationalAvatar"
  />
  <div
    v-else
    data-testid="unauthorizedIcon"
    class="w-[40px] aspect-square bg-black rounded-full flex items-center justify-center text-md text-white"
  >
    ?
  </div>
</template>
<script setup lang="ts">
import { PresentationalAvatar } from '@s1kebeats/s1kebeats-ui';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>
