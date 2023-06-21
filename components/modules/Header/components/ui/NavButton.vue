<template>
  <button
    class="rounded-lg py-2 px-4 font-medium text-sm flex items-center justify-center gap-2"
  >
    <Icon :name="icon" size="20px" />
    <span> {{ text }} </span>
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{
  text: string;
  icon: string;
}>();
</script>
