<template>
  <div id="default" class="flex flex-col items-center min-h-[100vh]">
    <transition name="loading">
      <div
        class="absolute z-[9999] top-0 left-0 w-full h-full bg-white"
        v-if="userStore.loading"
      ></div>
    </transition>

    <TheHeader />
    <slot />
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const userStore = useUserStore();

onMounted(async () => {
  if (!userStore.authorized && localStorage.getItem('accessToken')) {
    await userStore.checkAuth();
  } else {
    userStore.setLoading(false);
  }
});
</script>
<style lang="scss" scoped>
.loading-leave-active {
  transition: opacity 2s ease;
}
.loading-leave-to {
  opacity: 0;
}
</style>
