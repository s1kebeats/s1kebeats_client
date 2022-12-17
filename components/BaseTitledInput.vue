<template>
  <div
    class="rounded-lg border-[1px] px-5 py-2 transition-all"
    :class="inputFocused ? 'border-[#7945fc]' : ''"
  >
    <label :for="title" class="text-sm font-semibold transition-all">{{
      title
    }}</label>
    <div class="flex items-center">
      <input
        :name="title"
        class="focus:outline-none grow font-semibold!"
        :type="type ? type : 'text'"
        :placeholder="placeholder"
        :value="value"
        autocomplete="off"
        @input="updateValue"
        @focus="toggleFocusedState(true)"
        @blur="toggleFocusedState(false)"
      />
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string;
  placeholder?: string;
  value: string;
  type?: string;
  debounce?: boolean;
}>();
const emit = defineEmits<{
  (e: 'updateValue', value: string): void;
}>();
// debounced emitting
let timeout: NodeJS.Timeout;
const updateValueDebounced = (e: Event) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    const input = e.target as HTMLInputElement;
    emit('updateValue', input.value);
  }, 500);
};
const updateValue = (e: Event) => {
  if (props.debounce) {
    updateValueDebounced(e);
  } else {
    const input = e.target as HTMLInputElement;
    emit('updateValue', input.value);
  }
};
const inputFocused = ref(false);
const toggleFocusedState = (value: boolean) => {
  inputFocused.value = value;
};
</script>
