<template>
  <img
    v-if="uploadStore.beat.image"
    :src="`${runtimeConfig.public.API_URL}/media/${uploadStore.beat.image}`"
    class="w-[50%] min-w-[160px] aspect-square rounded-lg object-cover"
    alt="beatImage"
  />
  <div
    v-else
    class="w-[50%] min-w-[160px] aspect-square text-white font-medium text-4xl rounded-lg green-bg flex items-center justify-center"
  >
    ?
  </div>
</template>
<script setup lang="ts">
import useUploadStore from '@/components/modules/UploadForm/store';

const uploadStore = useUploadStore();
const runtimeConfig = useRuntimeConfig();
</script>
