<template>
  <div class="flex flex-col gap-2 border-[1px] rounded-lg">
    <UiApiImage
      :src="data.image ? data.image : ''"
      class="w-full aspect-square rounded-t-lg"
    />
    <div class="flex justify-between gap-3 px-3 pb-2">
      <span class="font-semibold text-lg truncate">
        {{ data.name }}
      </span>
      <div class="flex bg-[#7945fc] px-1 rounded-md text-white">
        <Icon
          class="m-auto"
          :name="data.stemsPrice ? 'mdi:folder-music' : 'mdi:music-note-eighth'"
        />
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
