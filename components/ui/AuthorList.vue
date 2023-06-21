<template>
  <section class="w-full px-[3%] grid grid-cols-2 grid-rows-1 gap-3 pb-3">
    <AppAuthor v-for="author in data" :data="author" :key="author.id" />
    <AppAuthor v-for="author in data" :data="author" :key="author.id" />
    <AppAuthor v-for="author in data" :data="author" :key="author.id" />
  </section>
</template>
<script setup lang="ts">
import Author from '@/api/models/Author';

const props = defineProps<{
  data: Author[];
}>();
</script>
