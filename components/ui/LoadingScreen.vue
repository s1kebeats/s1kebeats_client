<template>
  <transition name="loading">
    <div
      v-show="loading"
      class="absolute z-[9999] top-0 left-0 w-full h-full bg-white flex items-center justify-center"
      data-testid="loading"
    >
      <UiLogo class="w-[15%]" />
    </div>
  </transition>
</template>
<script setup lang="ts">
const props = defineProps<{
  loading: boolean;
}>();
</script>
<style lang="scss" scoped>
.loading-leave-active {
  transition: opacity 0.1s ease;
}
.loading-leave-to {
  opacity: 0;
}
</style>
