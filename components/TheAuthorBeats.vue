<template>
  <section class="w-full w-[1480px] flex gap-5">
    <BaseBeat v-for="beat in data" :data="beat" :key="beat.id" />
  </section>
</template>
<script setup lang="ts">
import BeatForAuthor from '~~/models/BeatForAuthor';

const props = defineProps<{
  data: BeatForAuthor[];
}>();
</script>
