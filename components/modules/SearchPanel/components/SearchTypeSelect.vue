<template>
  <div class="flex items-center text-sm text-gray-400">
    <button @click="searchPanelStore.setType('tracks')" :class="searchPanelStore.type === 'tracks' ? 'font-semibold !text-black' : ''" class="px-2 border-r-[1px]">Треки</button>
    <button @click="searchPanelStore.setType('authors')" :class="searchPanelStore.type === 'authors' ? 'font-semibold !text-black' : ''" class="px-2 ">Авторы</button>
  </div>
</template>
<script setup lang="ts">
import useSearchPanelStore from '../store';

const searchPanelStore = useSearchPanelStore();
</script>