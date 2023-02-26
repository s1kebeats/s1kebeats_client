<template>
  <img data-testid="apiImage" :src="'http://localhost:5000/api/media/' + src" />
</template>
<script setup lang="ts">
const props = defineProps<{
  src: string;
}>();
</script>
