<template>
  <a
    target="_blank"
    data-testid="link"
    :href="'https://www.youtube.com/@' + username"
  >
    <Icon
      name="mdi:youtube"
      data-testid="icon"
      :width="width"
      :height="height"
      color="black"
    />
  </a>
</template>
<script setup lang="ts">
const props = defineProps<{
  username: string;
  width: string;
  height: string;
}>();
</script>
