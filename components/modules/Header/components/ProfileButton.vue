<template>
  <button
    @click="uiStore.toggleProfileOverlay"
    class="flex items-center gap-1"
    @focusout="closeProfileOverlay"
    data-testid="profileButton"
  >
    <ProfileIcon />
    <Icon
      name="ic:baseline-keyboard-arrow-down"
      size="20px"
      class="transition-all"
      :class="uiStore.profileOverlay ? 'rotate-180' : ''"
      data-testid="profileButtonIcon"
    />
  </button>
</template>
<script setup lang="ts">
import ProfileIcon from './ui/ProfileIcon.vue';
import useUiStore from '@/stores/ui';
const uiStore = useUiStore();

function closeProfileOverlay() {
  setTimeout(() => uiStore.setProfileOverlay(false), 200);
}
</script>
