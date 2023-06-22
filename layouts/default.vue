<template>
  <div
    id="default"
    class="flex flex-col min-h-[100dvh]"
    data-testid="defaultLayout"
  >
    <Header />
    <main class="grow w-full flex flex-col items-center gap-3">
      <slot />
    </main>
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
