<template>
  <SBTextInput
    icon="material-symbols:search"
    :callback="search"
    class="grow max-w-[400px]"
    name="header-search"
    label="Поиск"
    size="sm"
    @update:value="updateSearchQuery"
    :preset="initialQuery"
    data-testid="headerSearch"
  />
</template>
<script setup lang="ts">
import { SBTextInput } from '@s1kebeats/s1kebeats-ui';

const route = useRoute();
const initialQuery = route.query.q as string;
const searchQuery = ref(route.query.q);

async function search() {
  await navigateTo(`/search?q=${searchQuery.value}`);
}

function updateSearchQuery(query: string) {
  searchQuery.value = query;
}
</script>
