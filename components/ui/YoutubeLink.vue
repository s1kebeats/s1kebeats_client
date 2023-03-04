<template>
  <UiSocialLink icon="mdi:youtube" :username="username" url="https://www.youtube.com/@" :width="width" :height="height" />
</template>
<script setup lang="ts">
const props = defineProps<{
  username: string;
  width: string;
  height: string;
}>();
</script>