<template>
  <button
    data-testid="navButton"
    class="rounded-lg py-2 px-4 font-medium desktop-text-sm flex items-center justify-center gap-2"
  >
    <Icon data-testid="navButtonIcon" :name="icon" size="20px" />
    <span data-testid="navButtonText"> {{ text }} </span>
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{
  text: string;
  icon: string;
}>();
</script>
