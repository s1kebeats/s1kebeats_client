<template>
  <button
    v-show="uiStore.loading"
    class="relative bg-yellow-500 flex items-center justify-center link transition-all disabled:cursor-not-allowed"
    :class="[buttonSizingClasses]"
  >
    <div
      data-testid="buttonContentWrapper"
      class="flex items-center justify-center"
      :class="[buttonElementsContainerSizingClasses]"
    >
      <slot />
    </div>
  </button>
</template>
<script setup lang="ts">
import useUiStore from '@/stores/test';

const uiStore = useUiStore();

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
});

const buttonSizingClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'desktop-text-xs rounded-lg min-h-[48px] px-4 gap-3';
    case 'lg':
      return 'desktop-text-sm rounded-xl min-h-[56px] px-8 gap-4';
    case 'xl':
      return 'desktop-text-md rounded-2xl min-h-[60px] px-8 gap-4';
    default:
      return 'desktop-text-sm rounded-xl min-h-[52px] px-6 gap-3';
  }
});

const buttonElementsContainerSizingClasses = computed(() => {
  switch (props.size) {
    case 'lg':
    case 'xl':
      return 'gap-4';
    default:
      return 'gap-3';
  }
});
</script>
