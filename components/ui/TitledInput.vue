<template>
  <div
    class="flex flex-col border-[1px] rounded-lg py-2 px-5 transition-all"
    data-testid="input"
    :class="focused ? 'border-violet-500' : ''"
  >
    <label :for="title" data-testid="title" class="text-sm font-semibold">
      {{ title }}
      <span v-if="required">*</span>
    </label>
    <div class="grow flex gap-1 items-start">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
  focused: boolean;
  required?: boolean;
}>();
</script>