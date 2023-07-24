<template>
  <button
    class="flex items-center justify-center bg-black text-white rounded-lg py-1.5 px-3 desktop-text-xs transition-all"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{}>();
</script>
