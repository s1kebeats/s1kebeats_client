<template>
  <div
    data-testid="overlay"
    class="absolute z-[1] right-0 px-[3%] py-3 top-[64px] w-full h-[calc(100dvh-64px)] bg-white text-black flex flex-col justify-between"
    v-show="uiStore.overlay"
  >
    <ClientOnly>
      <UiNav />
      <ActionPanel />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import ActionPanel from './components/ActionPanel.vue';
import UiNav from './components/ui/Nav.client.vue';
import useUiStore from '@/stores/ui';
const uiStore = useUiStore();
</script>
