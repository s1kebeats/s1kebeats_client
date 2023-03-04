<template>
  <UiSocialLink icon="mdi:instagram" :username="username" url="https://www.instagram.com/" :width="width" :height="height" />
</template>
<script setup lang="ts">
const props = defineProps<{
  username: string;
  width: string;
  height: string;
}>();
</script>
