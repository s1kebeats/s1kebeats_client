<template>
    <div class="rounded-lg border-[1px] px-5 py-2">
        <p class="text-sm">{{ title }}</p>
        <input :type="type ? type : 'text'" :placeholder="placeholder" :value="value" @input="updateValue">
        <slot />
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    title: string;
    placeholder?: string;
    value: string;
    type?: string;
}>()
const emit = defineEmits<{
    (e: "updateValue", value: string): void
}>()
const updateValue = (e: Event) => {
    const input = e.target as HTMLInputElement;
    emit("updateValue", input.value);
}
</script>