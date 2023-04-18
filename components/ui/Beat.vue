<template>
  <div>
    <image :src="`${runtimeConfig.public.API_URL}/media/${data.image}`" class="w-[230px] h-[230px]" />
    {{  data.name }}
  </div>
</template>
<script setup lang="ts">
import Beat from '@api/models/Beat';
import BeatForAuthor from '@api/models/BeatForAuthor';
const runtimeConfig = useRuntimeConfig()
const props = defineProps<{
  data: Beat | BeatForAuthor;
}>();
</script>
