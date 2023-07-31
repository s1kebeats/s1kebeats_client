<template>
  <section class="w-full px-[3%] grid grid-cols-2 gap-3 pb-3">
    <AppBeat v-for="beat in data" :data="beat" :key="beat.id" />
  </section>
</template>
<script setup lang="ts">
import BeatForAuthor from '@/api/models/BeatForAuthor';

const props = defineProps<{
  data: BeatForAuthor[];
}>();
</script>
