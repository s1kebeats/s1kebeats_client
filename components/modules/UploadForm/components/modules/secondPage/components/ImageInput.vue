<template>
  <MediaInput
    icon="material-symbols:image-outline-rounded"
    name="image"
    title="Обложка"
    accept=".jpg, .png, .jpeg"
    description="Изображение в формате .jpg, .png, .jpeg"
    @update-value="updateValue"
  />
</template>
<script setup lang="ts">
import MediaInput from './ui/MediaInput.vue';

const emit = defineEmits<{
  (e: 'updateValue', value: File): void;
}>();
const updateValue = (value: File) => {
  emit('updateValue', value);
};
</script>
