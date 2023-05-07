<template>
  <div class="flex flex-col gap-2 border-[1px] rounded-lg">
    <AppApiImage
      :src="data.image ? data.image : ''"
      class="w-full aspect-square rounded-t-lg"
    />
    <div class="flex flex-col px-3 pb-3">
      <div class="flex justify-between items-center gap-1">
        <span class="font-semibold text-lg truncate">
          {{ data.name }}
        </span>
        <span class="bg-[#7945fc] text-white truncate text-sm rounded-md px-1"
          >{{ data.wavePrice }}р.</span
        >
      </div>
      <div v-if="data.user" class="text-sm font-semibold">
        {{ data.user.username }}
      </div>
      <div
        v-if="data.tags.length"
        class="mt-2 max-w-full flex flex-wrap gap-1 text-xs tags-container max-h-[36px] overflow-hidden"
      >
        <nuxt-link
          v-for="tag in data.tags"
          :to="`/search?tags=${tag.name}`"
          :key="tag.id"
          class="bg-black text-white rounded-md px-1"
        >
          #{{ tag.name }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Beat from '@/api/models/Beat';
import BeatForAuthor from '@/api/models/BeatForAuthor';
const runtimeConfig = useRuntimeConfig();
const props = defineProps<{
  data: Beat | BeatForAuthor;
}>();
</script>
<style lang="scss" scoped>
.tags-container::-webkit-scrollbar {
  display: none;
}
</style>
