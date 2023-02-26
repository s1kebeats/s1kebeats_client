<template>
  <a target="_blank" :href="'https://www.instagram.com/' + username">
    <Icon name="mdi:instagram" :width="width" :height="height" />
  </a>
</template>
<script setup lang="ts">
const props = defineProps<{
  username: string;
  width: string;
  height: string;
}>();
</script>
