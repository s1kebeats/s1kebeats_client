<template>
  <nuxt-link :to="'https://vk.com/' + username">
    <Icon name="mdi:vk" :width="width" :height="height" />
  </nuxt-link>
</template>
<script setup lang="ts">
const props = defineProps<{
  username: string;
  width: string;
  height: string;
}>();
</script>
