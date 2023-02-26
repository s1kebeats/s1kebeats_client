<template>
  <a target="_blank" :href="'https://www.youtube.com/@' + username">
    <Icon name="mdi:youtube" :width="width" :height="height" color="black" />
  </a>
</template>
<script setup lang="ts">
const props = defineProps<{
  username: string;
  width: string;
  height: string;
}>();
</script>
