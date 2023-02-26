<template>
  <a target="_blank" :href="'https://vk.com/' + username">
    <Icon name="mdi:vk" :width="width" :height="height" />
  </a>
</template>
<script setup lang="ts">
const props = defineProps<{
  username: string;
  width: string;
  height: string;
}>();
</script>
