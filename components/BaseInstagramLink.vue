<template>
  <nuxt-link :to="'https://www.instagram.com/' + username">
    <Icon name="mdi:instagram" :width="width" :height="height" />
  </nuxt-link>
</template>
<script setup lang="ts">
const props = defineProps<{
  username: string;
  width: string;
  height: string;
}>();
</script>
