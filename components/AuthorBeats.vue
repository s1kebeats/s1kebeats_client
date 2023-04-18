<template>
  <section class="w-[1480px] flex gap-5">
    <UiBeat v-for="beat in data" :data="beat" :key="beat.id" />
  </section>
</template>
<script setup lang="ts">
import BeatForAuthor from '@/api/models/BeatForAuthor';

const props = defineProps<{
  data: BeatForAuthor[];
}>();
</script>
