<template>
  <UiTitledInput :title="title" :focused="focused" @click="focus">
    <input
      ref="input"
      class="grow h-full focus:outline-none"
      autocomplete="off"
      :type="type"
      :name="title"
      :placeholder="placeholder"
      @input="updateValue"
      @focus="focus"
      @blur="blur"
    />
    <slot />
  </UiTitledInput>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
  placeholder: string;
  type: 'text' | 'email' | 'password';
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
