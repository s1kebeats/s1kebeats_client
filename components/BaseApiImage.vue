<template>
  <img :src="'http://localhost:5000/api/file/' + src" />
</template>
<script setup lang="ts">
const props = defineProps<{
  src: string;
}>();
</script>
