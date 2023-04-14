<template>
  <button
    class="h-[400px] w-[400px] border-[1px] flex flex-col items-center justify-center p-10 rounded-md transition-all"
    :class="selected ? 'bg-black text-white' : ''"
  >
    <Icon :name="icon" height="90px" width="90px" />
    <div class="flex flex-col items-center gap-1">
      <span class="text-2xl font-semibold"> {{ title }}</span>
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
