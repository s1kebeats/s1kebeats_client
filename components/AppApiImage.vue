<template>
  <img
    data-testid="apiImage"
    class="object-cover"
    :src="runtimeConfig.public.MEDIA_URL + src"
  />
</template>
<script setup lang="ts">
const props = defineProps<{
  src: string;
}>();
const runtimeConfig = useRuntimeConfig();
</script>
