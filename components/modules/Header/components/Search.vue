<template>
  <TextInput
    icon="material-symbols:search"
    :callback="search"
    class="absolute left-0 right-0 mx-auto w-[45%] max-w-[600px]"
    name="header-search"
    label="Поиск"
    size="sm"
    @update-value="updateSearchQuery"
    :preset="(route.query.q as string)"
    data-testid="headerSearchInput"
  />
</template>
<script setup lang="ts">
import { TextInput } from '@s1kebeats/s1kebeats-ui';

const route = useRoute();
const searchQuery = ref(route.query.q);

async function search() {
  await navigateTo(`/search?q=${searchQuery.value}`);
}

function updateSearchQuery(query: string) {
  searchQuery.value = query;
}
</script>
