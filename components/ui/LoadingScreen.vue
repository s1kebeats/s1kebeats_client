<template>
  <transition name="loading">
    <div
      v-show="loading"
      class="absolute z-[2] flex w-full h-full bg-white"
      data-testid="loading"
    >
      <UiLogo class="w-[15%] max-w-[300px] min-w-[175px] m-auto" />
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
