<template>
  <button
    @click="uiStore.toggleOverlay"
    class="flex items-center gap-1"
    @focusout="closeOverlay"
    data-testid="overlayButton"
  >
    <ClientOnly>
      <ProfileIcon />
    </ClientOnly>
    <Icon
      icon="ic:baseline-keyboard-arrow-down"
      class="transition-all text-[20px]"
      :class="uiStore.overlay ? 'rotate-180' : ''"
      data-testid="overlayButtonIcon"
    />
  </button>
</template>
<script setup lang="ts">
import { ProfileIcon } from '@/components/modules/AppHeader/components/ui';
import { useUiStore } from '@/stores';
import { Icon } from '@iconify/vue';
const uiStore = useUiStore();

function closeOverlay() {
  setTimeout(() => uiStore.setOverlay(false), 200);
}
</script>
