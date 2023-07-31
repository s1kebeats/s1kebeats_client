<template>
  <img
    data-testid="apiImage"
    class="object-cover"
    :width="width"
    :height="height"
    :src="runtimeConfig.public.MEDIA_URL + src"
  />
</template>
<script setup lang="ts">
const props = defineProps<{
  src: string;
  width?: string;
  height?: string;
}>();
const runtimeConfig = useRuntimeConfig();
</script>
