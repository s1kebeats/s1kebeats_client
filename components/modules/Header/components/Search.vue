<template>
  <div
    class="gap-3 px-3 h-[40px] bg-white rounded-lg flex-1 border-[1px] max-w-[600px] flex items-center transition-all"
    :class="inputFocused ? 'border-[#7945fc]' : ''"
    data-testid="headerSearch"
  >
    <button @click="search">
      <Icon name="material-symbols:search" class="cursor-pointer" size="20px" />
    </button>

    <input
      data-testid="headerSearchInput"
      type="text"
      class="flex-1 h-[20px] focus:outline-none text-sm"
      placeholder="Найди свой звук"
      autocomplete="off"
      v-model="searchQuery"
      @focus="toggleFocusedState(true)"
      @blur="toggleFocusedState(false)"
    />
  </div>
</template>
<script setup lang="ts">
const inputFocused = ref(false);
const toggleFocusedState = (value: boolean) => {
  inputFocused.value = value;
};

const searchQuery = ref('');

async function search() {
  await navigateTo(`/search?q=${searchQuery}`);
}

async function submitOnEnter(e: KeyboardEvent) {
  if (e.key == 'Enter') {
    await search();
  }
}

watch(inputFocused, () => {
  if (inputFocused.value) {
    document.addEventListener('keypress', submitOnEnter);
  } else {
    document.removeEventListener('keypress', submitOnEnter);
  }
});
</script>
