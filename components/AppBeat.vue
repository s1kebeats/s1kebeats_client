<template>
  <div class="flex flex-col gap-3 border-[1px] rounded-lg">
    <AppApiImage
      v-if="data.image"
      :src="data.image"
      class="w-full aspect-square rounded-t-lg"
    />
    <div
      v-else
      class="bg-black w-full aspect-square rounded-t-lg flex items-center justify-center desktop-text-lg text-white"
    >
      ?
    </div>
    <div class="flex flex-col px-3 pb-3 gap-1">
      <div class="flex justify-between items-center gap-3">
        <span class="link desktop-text-sm truncate">
          {{ data.name }}
        </span>
        <span class="text-primary min-w-[50px] truncate desktop-text-sm link"
          >{{ data.wavePrice }}р.</span
        >
      </div>
      <div
        class="max-w-full flex flex-wrap gap-2 desktop-text-xs container max-h-[16px] overflow-hidden"
      >
        <div v-if="data.user" class="link">
          {{ data.user.username }}
        </div>
        <nuxt-link
          v-if="data.tags.length"
          v-for="tag in data.tags"
          :to="`/search?tags=${tag.name}`"
          :key="tag.id"
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
.container::-webkit-scrollbar {
  display: none;
}
</style>
