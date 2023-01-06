<template>
  <div
    class="rounded-lg border-[1px] px-5 py-2 transition-all flex flex-col"
    :class="inputFocused ? 'border-[#7945fc]' : ''"
  >
    <label :for="title" class="text-sm font-semibold transition-all">{{
      title
    }}</label>
    <div class="flex items-center grow">
      <textarea
        v-if="type === 'area'"
        :name="title"
        class="focus:outline-none grow w-full h-full resize-none"
        min="0"
        :type="type ? type : 'text'"
        :placeholder="placeholder"
        :value="localValue"
        autocomplete="off"
        @input="updateValue"
        @focus="toggleFocusedState(true)"
        @blur="toggleFocusedState(false)"
      ></textarea>
      <input
        v-else
        :name="title"
        class="focus:outline-none grow w-full"
        min="0"
        :type="type ? type : 'text'"
        :placeholder="placeholder"
        :value="localValue"
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
  value: string | number | null;
  type?: string;
  debounce?: boolean;
}>();

const emit = defineEmits<{
  (e: 'updateValue', value: string): void;
}>();

const localValue = ref();

// debounced emitting
let timeout: NodeJS.Timeout;
const updateValueDebounced = (e: Event) => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    emit('updateValue', localValue.value);
  }, 500);
};
const updateValue = (e: Event) => {
  const input = e.target as HTMLInputElement;
  localValue.value = input.value;
  if (props.debounce) {
    updateValueDebounced(e);
  } else {
    emit('updateValue', localValue.value);
  }
};
const inputFocused = ref(false);
const toggleFocusedState = (value: boolean) => {
  inputFocused.value = value;
};
</script>
