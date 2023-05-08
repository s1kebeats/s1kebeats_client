<template>
  <div
    class="border-[1px] rounded-lg py-2 px-5 transition-all"
    data-testid="titledInput"
    :class="focused ? 'border-violet-500' : ''"
  >
    <label
      v-if="title"
      :for="name"
      data-testid="titledInputLabel"
      class="text-sm font-semibold"
    >
      {{ title }}
      <span v-if="required" data-testid="titledInputRequiredIcon">*</span>
    </label>
    <div class="flex gap-1 items-center justify-between">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title?: string;
  name: string;
  focused?: boolean;
  required?: boolean;
}>();
</script>
