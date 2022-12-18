<template>
  <div
    class="gap-3 px-3 h-[40px] bg-white rounded-lg flex-1 border-[1px] max-w-[600px] flex items-center transition-all"
    :class="inputFocused ? 'border-[#7945fc]' : ''"
  >
    <Icon name="material-symbols:search" class="cursor-pointer" size="20px" />
    <input
      type="text"
      class="flex-1 h-[20px] focus:outline-none text-sm"
      placeholder="Найди свой звук"
      autocomplete="off"
      @focus="toggleFocusedState(true)"
      @blur="toggleFocusedState(false)"
    />
  </div>
</template>
<script setup lang="ts">
const inputFocused = ref(false);
const toggleFocusedState = (value: boolean) => {
  inputFocused.value = value;
}
</script>