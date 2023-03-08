<template>
  <div id="default" class="flex flex-col items-center min-h-[100vh]">
    <Header />
    <slot />
  </div>
</template>
<script setup lang="ts">
import Header from '@/components/modules/Header/Header.vue';
</script>
<style lang="scss" scoped>
.loading-leave-active {
  transition: opacity 2s ease;
}
.loading-leave-to {
  opacity: 0;
}
</style>
