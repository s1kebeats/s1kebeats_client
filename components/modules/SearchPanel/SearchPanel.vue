<template>
  <section class="w-full px-[3%]">
    <div class="flex justify-between">
      <SearchTypeSelect />
      <FiltersButton />
    </div>
    <FiltersPanel />
  </section>
</template>
<script setup lang="ts">
import SearchTypeSelect from './components/SearchTypeSelect.vue';
import FiltersButton from './components/FIltersButton.vue';
import FiltersPanel from './components/FiltersPanel.vue';
</script>
