<template>
    <div v-show="!searchPanelStore.panel" class="(border-[1px] rounded-md px-3) mt-3">
        <UiNumberInput  />
    </div>
</template>
<script setup lang="ts">
import useSearchPanelStore from '../store';

const searchPanelStore = useSearchPanelStore();
</script>