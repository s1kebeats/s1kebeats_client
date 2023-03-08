<template>
  <UiButton
    type="submit"
    class="relative flex items-center justify-center h-[36px]"
  >
    <UiLoadingSpinner v-if="pending" />
    <span v-else>
      <slot />
    </span>
  </UiButton>
</template>
<script setup lang="ts">
const props = defineProps<{
  pending: boolean;
}>();
</script>
<style lang="scss" scoped>
.spinner-enter-active,
.spinner-leave-active {
  transition: opacity 0.2s ease;
}
.spinner-enter-from,
.spinner-leave-to {
  opacity: 0;
}
</style>
