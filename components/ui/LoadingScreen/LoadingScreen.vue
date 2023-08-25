<template>
  <transition name="loading">
    <div
      v-show="uiStore.loading"
      class="absolute z-[9999] w-full h-full bg-grayscale-bg flex"
      data-testid="loadingScreen"
    >
      <MainLogo class="w-[clamp(175px,15%,300px)] m-auto" />
    </div>
  </transition>
</template>
<script setup lang="ts">
import MainLogo from '@/components/ui/MainLogo';
import { useUiStore } from '@/stores';
const uiStore = useUiStore();
</script>
<style lang="scss" scoped>
.loading-leave-active {
  transition: opacity 0.1s ease;
}
.loading-leave-to {
  opacity: 0;
}
</style>
