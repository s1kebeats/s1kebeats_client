<template>
  <UiTextInput
    :type="passwordVisible ? 'text' : 'password'"
    @update-value="updateValue"
    :title="title"
    :name="name"
    :placeholder="placeholder"
  >
    <button @click.prevent="togglePasswordVisibility">
      <Icon
        size="16px"
        :name="
          passwordVisible
            ? 'material-symbols:visibility-outline-rounded'
            : 'material-symbols:visibility-off-outline-rounded'
        "
      />
    </button>
  </UiTextInput>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
  name: string;
  placeholder: string;
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
