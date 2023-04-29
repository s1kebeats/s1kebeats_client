<template>
  <UiSocialLink
    icon="mdi:youtube"
    :username="username"
    url="https://www.youtube.com/@"
    :size="size"
  />
</template>
<script setup lang="ts">
const props = defineProps<{
  username: string;
  size: string;
}>();
</script>
