<template>
  <UiSocialLink icon="mdi:vk" :username="username" url="https://vk.com/" :width="width" :height="height" />
</template>
<script setup lang="ts">
const props = defineProps<{
  username: string;
  width: string;
  height: string;
}>();
</script>