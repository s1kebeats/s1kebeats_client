<template>
  <h1 class="link desktop-display-xs" data-testid="formHeader">{{ title }}</h1>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>
