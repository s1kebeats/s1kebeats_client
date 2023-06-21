<template>
  <div class="flex flex-col gap-1 items-center">
    <AppApiImage
      v-if="data.image"
      :src="data.image"
      class="w-full aspect-square rounded-full"
    />
    <div
      v-else
      class="bg-black w-full aspect-square rounded-full flex items-center justify-center text-2xl text-white"
    >
      ?
    </div>
    <div class="font-semibold text-sm truncate">
        {{ data.username }}
    </div>
  </div>
</template>
<script setup lang="ts">
import Author from '~~/api/models/Author';
const props = defineProps<{
  data: Author;
}>();
</script>
