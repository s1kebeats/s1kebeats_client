<template>
  <button
    class="grow border-[1px] flex flex-col items-center justify-center p-4 rounded-md transition-all"
    :class="selected ? 'bg-black text-white' : ''"
  >
    <Icon :name="icon" size="40%" />
    <div class="flex flex-col items-center">
      <span class="font-semibold"> {{ title }}</span>
      <span class="text-xs"> {{ description }}</span>
    </div>
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{
  icon: string;
  title: string;
  description: string;
  selected: boolean;
}>();
</script>
