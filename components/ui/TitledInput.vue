<template>
  <div
    class="border-[1px] rounded-lg py-2 px-5 transition-all"
    data-testid="input"
    :class="focused ? 'border-violet-500' : ''"
  >
    <label :for="title" data-testid="title" class="text-sm font-semibold">
      {{ title }}
    </label>
    <div class="flex items-center gap-1">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
  focused: boolean;
}>();
</script>
