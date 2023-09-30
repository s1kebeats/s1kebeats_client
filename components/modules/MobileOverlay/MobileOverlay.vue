<template>
  <transition appear name="slide-vert">
    <section
      v-show="uiStore.overlay"
      class="md:hidden absolute top-[64px] left-0 w-full h-[calc(100dvh-64px)] bg-white flex flex-col pb-2"
    >
      <div class="grow">g</div>
      <ActionPanel />
    </section>
  </transition>
</template>
<script setup lang="ts">
import { useUiStore } from '@/stores';
import { ActionPanel } from './components';

const uiStore = useUiStore();
</script>
<style lang="scss">
.slide-vert-enter-active {
  transition: transform 0.2s;
}

.slide-vert-leave-active {
  transition: transform 0.2s;
}

.slide-vert-enter-from,
.slide-vert-leave-to {
  transform: translateY(100%);
}

.slide-vert-leave-from,
.slide-vert-enter-to {
  transform: translateY(0);
}
</style>
