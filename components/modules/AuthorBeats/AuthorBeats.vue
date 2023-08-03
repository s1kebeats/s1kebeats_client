<template>
  <section class="w-full px-5 grid grid-cols-2 gap-3 pb-3">
    <Beat v-for="beat in beats" :beat="beat" :key="beat.id" />
  </section>
</template>
<script setup lang="ts">
import type BeatType from '@/api/models/Beat';
import Beat from '@/components/modules/Beat/Beat.vue';

const props = defineProps<{
  beats: BeatType[];
}>();
</script>
