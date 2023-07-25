<template>
  <button
    class="rounded-md px-1 border-[1px]"
    @click="searchPanelStore.togglePanel"
    :class="searchPanelStore.panel ? 'border-[#7945fc]' : ''"
  >
    <Icon
      name="material-symbols:filter-list-rounded"
      size="20px"
      color="black"
    />
  </button>
</template>
<script setup lang="ts">
import useSearchPanelStore from '../store';

const searchPanelStore = useSearchPanelStore();
</script>
