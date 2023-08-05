<template>
  <SearchPanel />
  <!-- <UiAuthorList
    v-if="authorsData?.authors.length"
    :data="authorsData.authors"
  /> -->
  <UiBeatList v-if="beatsData?.beats.length" :data="beatsData.beats" />
</template>
<script setup lang="ts">
import Beat from '@/api/models/Beat';
import Author from '@/api/models/Author';
import SearchPanel from '@/components/modules/SearchPanel/SearchPanel.vue';
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const query = ref(route.query.q);
const { data: beatsData } = await useFetch<{
  beats: Beat[];
  viewed: number;
}>(`${runtimeConfig.public.API_URL}/beat`, {
  query: {
    q: query,
  },
  key: 'beats',
});
const { data: authorsData } = await useFetch<{
  authors: Author[];
  viewed: number;
}>(`${runtimeConfig.public.API_URL}/author`, {
  query: {
    q: query,
  },
  key: 'authors',
});
watch(
  () => route.query,
  async () => {
    query.value = route.query.q;
  }
);
</script>
