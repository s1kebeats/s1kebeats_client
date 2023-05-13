<template>
  <UiSocialLink
    icon="mdi:instagram"
    :username="username"
    url="https://www.instagram.com/"
    :size="size"
    data-testid="instagramLink"
  />
</template>
<script setup lang="ts">
const props = defineProps<{
  username: string;
  size: string;
}>();
</script>
