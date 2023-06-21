<template>
  <section class="w-full mt-3 flex flex-col gap-3">
    <h1 class="px-[3%] text-xl font-semibold">Авторы</h1>
    <UiAuthorList
      v-if="authorsData?.authors.length"
      :data="authorsData.authors"
    />
  </section>
  <section class="w-full mt-3 flex flex-col gap-3">
    <h1 class="px-[3%] text-xl font-semibold">Треки</h1>
    <UiBeatList v-if="beatsData?.beats.length" :data="beatsData.beats" />
  </section>
</template>
<script setup lang="ts">
import Beat from '@/api/models/Beat';
import Author from '@/api/models/Author';
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const { data: authorsData } = await useFetch<{
  authors: Author[];
  viewed: number;
}>(`${runtimeConfig.public.API_URL}/author?q=${route.query.q}`);
const { data: beatsData } = await useFetch<{ beats: Beat[]; viewed: number }>(
  `${runtimeConfig.public.API_URL}/beat?q=${route.query.q}`
);
</script>
