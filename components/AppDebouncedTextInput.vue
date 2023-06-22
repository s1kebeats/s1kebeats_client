<template>
  <AppTextInput
    :title="title"
    :name="name"
    :placeholder="placeholder"
    :type="type"
    @update-value="updateValue"
    :required="required"
    :value="localValue || value"
    data-testid="textInput"
  >
    <slot />
  </AppTextInput>
</template>
<script setup lang="ts">
interface Props {
  name: string;
  title?: string;
  placeholder?: string;
  type: 'text' | 'email' | 'password';
  required?: boolean;
  value: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

const emit = defineEmits<{
  (event: 'updateValue', value: string): void;
}>();

const localValue = ref<string>('');

let debounceTimeout: NodeJS.Timeout;

function updateValue(value: string) {
  localValue.value = value;
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    emit('updateValue', localValue.value);
    localValue.value = '';
  }, 500);
}
</script>
