<template>
  <div class="flex flex-col gap-2 border-[1px] rounded-md">
    <img
      v-if="beat.image"
      :src="beat.image"
      class="w-full aspect-square rounded-t-md"
    />
    <div
      v-else
      class="bg-black w-full aspect-square rounded-t-lg flex items-center justify-center desktop-text-lg text-white"
    >
      ?
    </div>
    <div class="flex flex-col px-3 pb-3 gap-1">
      <div class="link truncate">
        {{ beat.name }}
      </div>
      <div class="flex justify-between items-center gap-1">
        <span class="desktop-text-xs truncate link">
          {{ beat.user.username }}
        </span>
        <span class="text-primary desktop-text-xs"
          >{{ beat.wavePrice }}р.</span
        >
      </div>
      <!-- <div
        class="flex flex-wrap gap-1 desktop-text-xs"
      >

        <nuxt-link
          v-if="beat.tags.length"
          v-for="tag in beat.tags"
          :to="`/search?tags=${tag.name}`"
          :key="tag.id"
        >
          #{{ tag.name }}
        </nuxt-link>
      </div> -->
      <div class="flex desktop-text-xs gap-1 justify-between overflow-x-auto text-white">
        <div class="bg-primary rounded-md px-1">
        mp3
      </div>
      <div class="bg-primary rounded-md px-1">
        wav
      </div>
      <div v-if="beat.stemsPrice" class="bg-primary rounded-md px-1">
        stems
      </div>
      </div>

    </div>
  </div>
</template>
<script setup lang="ts">
import Beat from '@/api/models/Beat';
const runtimeConfig = useRuntimeConfig();
const props = defineProps<{
  beat: Beat;
}>();
</script>
<style lang="scss" scoped>
.container::-webkit-scrollbar {
  display: none;
}
</style>
