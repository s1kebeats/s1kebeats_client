<template>
  <UiLoadingScreen :loading="uiStore.loading" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import useUiStore from './stores/ui';
const uiStore = useUiStore();
</script>
