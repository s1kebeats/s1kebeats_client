<template>
  <UiTitledInput
    :title="title"
    :focused="focused"
    @click="focus"
    :required="required"
  >
    <input
      ref="input"
      class="max-w-[calc(100%-16px)] focus:outline-none"
      autocomplete="off"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @input="updateValue"
      @focus="focus"
      @blur="blur"
      data-testid="textInput"
    />
    <slot />
  </UiTitledInput>
</template>
<script setup lang="ts">
import UiTitledInput from './TitledInput.vue';
const props = defineProps<{
  title: string;
  name: string;
  placeholder: string;
  type: 'text' | 'email' | 'password';
  required?: boolean;
}>();
const emit = defineEmits<{
  (event: 'updateValue', value: string): void;
}>();

const input = ref();
const value = ref('');

function updateValue(e: Event) {
  const input = e.target as HTMLInputElement;
  value.value = input.value;
  emit('updateValue', value.value);
}

const focused = ref(false);

function focus() {
  input.value.focus();
  focused.value = true;
}
function blur() {
  focused.value = false;
}

onMounted(() => {
  emit('updateValue', value.value);
});
</script>
