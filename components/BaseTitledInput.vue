<template>
    <div class="rounded-lg border-[1px] px-5 py-2">
        <p class="text-sm">{{ title }}</p>
        <div class="flex items-center">
            <input class="focus:outline-none grow" :type="type ? type : 'text'" :placeholder="placeholder" :value="value" @input="updateValue">
            <slot />
        </div>

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
// debounced emitting
let timeout: NodeJS.Timeout;
const updateValue = (e: Event) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        const input = e.target as HTMLInputElement;
        emit("updateValue", input.value);
    }, 500)
}
watch(() => props.type, () => {
    console.log(props.type)
})
</script>