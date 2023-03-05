<template>
  <UiTextInput
    :title="title"
    :name="name"
    :placeholder="placeholder"
    :type="type"
    @update-value="updateValue"
  />
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
  name: string;
  placeholder: string;
  type: 'text' | 'email' | 'password';
}>();
const emit = defineEmits<{
  (event: 'updateValue', value: string): void;
}>();

const localValue = ref('');

let debounceTimeout: NodeJS.Timeout;

function updateValue(value: string) {
  localValue.value = value;
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    emit('updateValue', localValue.value);
  }, 500);
}
</script>
