<template>
  <button
    class="grow h-full rounded-lg border-[1px] flex flex-col gap-5 justify-center items-center font-medium p-10"
  >
    <Icon :name="icon" size="110px" />
    <div class="flex flex-col gap-1">
      <span class="text-3xl">
        {{ title }}
      </span>
      <span class="text-xs">
        {{ description }}
      </span>
    </div>
  </button>
</template>
<script setup lang="ts">
const props = defineProps<{
  icon: string;
  title: string;
  description: string;
}>();
</script>
