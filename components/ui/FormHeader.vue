<template>
  <header class="flex flex-col items-center gap-3">
    <h1 class="font-semibold text-3xl" data-testid="title">{{ title }}</h1>
  </header>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>
