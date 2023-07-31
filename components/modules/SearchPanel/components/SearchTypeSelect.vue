<template>
  <div class="flex items-center desktop-text-sm text-gray-400">
    <button
      @click="searchPanelStore.setType('tracks')"
      :class="searchPanelStore.type === 'tracks' ? 'link !text-black' : ''"
      class="px-2 border-r-[1px]"
    >
      Треки
    </button>
    <button
      @click="searchPanelStore.setType('authors')"
      :class="searchPanelStore.type === 'authors' ? 'link !text-black' : ''"
      class="px-2"
    >
      Авторы
    </button>
  </div>
</template>
<script setup lang="ts">
import useSearchPanelStore from '../store';

const searchPanelStore = useSearchPanelStore();
</script>
