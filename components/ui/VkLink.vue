<template>
  <UiSocialLink
    icon="mdi:vk"
    :username="username"
    url="https://vk.com/"
    :size="size"
    data-testid="vkLink"
  />
</template>
<script setup lang="ts">
const props = defineProps<{
  username: string;
  size: string;
}>();
</script>
