<template>
  <div v-if="authStore.authorized" class="rounded-full bg-primary w-[48px] h-[48px]">
    <span
      v-if="!authStore.user!.image"
      class="link desktop-text-xs text-grayscale-bg"
    >
      {{ authStore.user!.username.slice(0, 2) }}
    </span>
    <AppApiImage
      v-if="authStore.user!.image"
      :src="authStore.user!.image"
      class="aspect-square"
      width="48px"
      height="48px"
      alt="Profile Image"
      data-testid="profileImage"
    />
  </div>
</template>
<script setup lang="ts">
import useAuthStore from '@/stores/auth';

const authStore = useAuthStore();
</script>
