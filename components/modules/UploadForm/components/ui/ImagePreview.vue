<template>
  <div>
    <img
      v-if="uploadStore.beat.image"
      :src="'file://' + uploadStore.beat.image"
      alt="beatImage"
    />
    <div v-else class="bg-black">?</div>
  </div>
</template>
<script setup lang="ts">
import useUploadStore from '@/components/modules/UploadForm/store';

const uploadStore = useUploadStore();
</script>
