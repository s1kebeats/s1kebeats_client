<template>
  <div
    class="absolute left-0 right-0 mx-auto gap-1 px-2 h-[55%] max-h-[80px] bg-white rounded-lg flex-1 border-[1px] w-[45%] max-w-[600px] flex items-center transition-all"
    :class="inputFocused ? 'border-[#7945fc]' : ''"
    data-testid="headerSearch"
  >
    <button @click="search">
      <Icon name="material-symbols:search" class="cursor-pointer" size="20px" />
    </button>

    <input
      data-testid="headerSearchInput"
      type="text"
      class="flex-1 h-[20px] focus:outline-none text-sm overflow-hidden"
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
const route = useRoute();
const searchQuery = ref(route.query.q);

async function search() {
  await navigateTo(`/search?q=${searchQuery.value}`);
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
