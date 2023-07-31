<template>
  <transition name="loading">
    <div
      v-show="uiStore.loading"
      class="absolute z-[2] flex w-full h-full bg-white"
      data-testid="loadingScreen"
    >
      <UiLogo class="w-[15%] max-w-[300px] min-w-[175px] m-auto" />
    </div>
  </transition>
</template>
<script setup lang="ts">
import useUiStore from '@/stores/ui';
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
