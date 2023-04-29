<template>
  <UiSocialLink
    icon="mdi:vk"
    :username="username"
    url="https://vk.com/"
    :size="size"
  />
</template>
<script setup lang="ts">
const props = defineProps<{
  username: string;
  size: string;
}>();
</script>
