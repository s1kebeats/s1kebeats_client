<template>
  <button
    @click="uiStore.toggleOverlay"
    class="flex items-center gap-1"
    @focusout="closeoverlay"
    data-testid="profileButton"
  >
    <ClientOnly>
      <ProfileIcon />
    </ClientOnly>
    <Icon
      name="ic:baseline-keyboard-arrow-down"
      size="20px"
      class="transition-all"
      :class="uiStore.overlay ? 'rotate-180' : ''"
      data-testid="profileButtonIcon"
    />
  </button>
</template>
<script setup lang="ts">
import ProfileIcon from './ui/ProfileIcon.vue';
import useUiStore from '@/stores/ui';
const uiStore = useUiStore();

function closeoverlay() {
  setTimeout(() => uiStore.setOverlay(false), 200);
}
</script>
