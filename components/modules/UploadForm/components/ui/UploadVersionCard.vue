<template>
    <button class="text-2xl rounded-lg border-[1px] flex flex-col justify-center items-center font-medium w-[350px] h-[350px]">
        <Icon :name="icon" size="120px" />
        <slot />
    </button>
</template>
<script setup lang="ts">
const props = defineProps<{
    icon: string;
}>()
</script>