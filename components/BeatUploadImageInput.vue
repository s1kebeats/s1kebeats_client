<template>
  <BaseFileInput
    icon="material-symbols:image-outline-rounded"
    name="image"
    title="Обложка"
    accept=".jpg, .png, .jpeg"
    description="Изображение в формате .jpg, .png, .jpeg"
    :value="value"
    @update-value="updateValue"
  />
</template>
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'updateValue', value: File): void;
}>();
const props = defineProps<{
  value: string;
}>();
const updateValue = (value: File) => {
  emit('updateValue', value);
};
</script>
