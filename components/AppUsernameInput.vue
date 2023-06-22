<template>
  <AppTextInput
    title="Имя пользователя"
    :name="name"
    type="text"
    placeholder="Введите имя пользователя"
    @update-value="updateValue"
    :required="required"
    :value="value"
    data-testid="textInput"
  />
</template>
<script setup lang="ts">
const props = defineProps<{
  name: string;
  required?: boolean;
  value: string;
}>();

const emit = defineEmits<{
  (e: 'updateValue', value: string): void;
}>();

function updateValue(value: string) {
  emit('updateValue', value);
}
</script>
