<template>
  <UiTitledInput
    :title="title"
    :focused="focused"
    @click="focus"
    :required="required"
  >
    <input
      ref="input"
      class="grow focus:outline-none"
      autocomplete="off"
      type="text"
      :name="name"
      :placeholder="placeholder"
      @input="updateValue"
      @focus="focus"
      @blur="blur"
      :value="value"
      data-testid="numberInput"
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
  required?: boolean;
}>();
const emit = defineEmits<{
  (event: 'updateValue', value: number): void;
}>();

const input = ref();
const value = ref<number>(0);

function updateValue(e: Event) {
  const input = e.target as HTMLInputElement;
  input.value = input.value.replace(/[^0-9.]/g, '');
  value.value = +input.value;
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
