<template>
  <a target="_blank" data-testid="link" :href="'https://vk.com/' + username">
    <Icon name="mdi:vk" data-testid="icon" :width="width" :height="height" />
  </a>
</template>
<script setup lang="ts">
const props = defineProps<{
  username: string;
  width: string;
  height: string;
}>();
</script>
