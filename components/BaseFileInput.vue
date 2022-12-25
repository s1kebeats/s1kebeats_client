<template>
  <div class="flex flex-col">
    <label for="file-upload" class="flex items-center w-[220px] cursor-pointer text-white p-3 rounded-md bg-[#7945fc]">
        <Icon v-if="icon" :name="icon" color="white" size="28px" />
        <div class="grow flex flex-col items-center">
            <span class="text-sm">        {{ title }}</span>
            <span v-if="description">        {{ description }}</span>
        </div>

    </label>
    <BaseButton @click="clearFileInput" class="text-xs py-1 px-1 rounded-md">Удалить</BaseButton>
    <input :name="name" id="file-upload" type="file" class="hidden" :value="value" @input="updateValue" />
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    title: string;
    description?: string;
    name: string;
    value: File | null;
    icon?: string;
}>();
const emit = defineEmits<{
    (e: 'updateValue', value: File | null): void;
}>()
const updateValue = (e: Event) => {
    // const input = e.target as HTMLInputElement;
    // const value = input.files;
    // emit('updateValue', value)
}
const clearFileInput = (e: Event): void => {
    emit('updateValue', null)
}
</script>