<template>
  <section class="w-full px-[3%]">
    <div class="flex justify-between">
      <SearchTypeSelect />
      <FiltersButton />
    </div>
  </section>
</template>
<script setup lang="ts">
import SearchTypeSelect from './components/SearchTypeSelect.vue';
import FiltersButton from './components/FIltersButton.vue';
</script>
