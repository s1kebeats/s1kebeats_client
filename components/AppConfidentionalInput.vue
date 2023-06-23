<template>
  <AppTextInput
    :type="passwordVisible ? 'text' : 'password'"
    @update-value="updateValue"
    :title="title"
    :name="name"
    :placeholder="placeholder"
    :required="required"
    :value="value"
    data-testid="textInput"
  >
    <button @click.prevent="togglePasswordVisibility" class="flex w-4">
      <Icon
        data-testid="visibilityIcon"
        size="16px"
        class="m-auto"
        :name="
          passwordVisible
            ? 'material-symbols:visibility-outline-rounded'
            : 'material-symbols:visibility-off-outline-rounded'
        "
      />
    </button>
  </AppTextInput>
</template>
<script setup lang="ts">
const props = defineProps<{
  title?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value: string;
}>();
const emit = defineEmits<{
  (e: 'updateValue', value: string): void;
}>();
const updateValue = (value: string) => {
  emit('updateValue', value);
};
const passwordVisible = ref(false);
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>
