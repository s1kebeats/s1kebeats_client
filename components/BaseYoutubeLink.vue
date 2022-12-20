<template>
  <nuxt-link :to="'https://www.instagram.com/@' + username">
    <Icon name="mdi:youtube" :width="width" :height="height" color="black" />
  </nuxt-link>
</template>
<script setup lang="ts">
const props = defineProps<{
  username: string;
  width: string;
  height: string;
}>();
</script>
