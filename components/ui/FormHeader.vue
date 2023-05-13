<template>
  <h1 class="font-semibold text-3xl" data-testid="formHeader">{{ title }}</h1>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>
