<template>
  <div class="rounded-lg border-[1px] px-5 py-2 w-[320px]">
    <label :for="title" class="text-sm">{{ title }}</label>
    <div class="flex items-center">
      <input
        :name="title"
        class="focus:outline-none grow"
        :type="type ? type : 'text'"
        :placeholder="placeholder"
        :value="value"
        @input="updateValue"
      />
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  title: string
  placeholder?: string
  value: string
  type?: string
  debounce?: boolean
}>()
const emit = defineEmits<{
  (e: 'updateValue', value: string): void
}>()
// debounced emitting
let timeout: NodeJS.Timeout
const updateValueDebounced = (e: Event) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    const input = e.target as HTMLInputElement
    emit('updateValue', input.value)
  }, 500)
}
const updateValue = (e: Event) => {
  if (props.debounce) {
    updateValueDebounced(e)
  } else {
    const input = e.target as HTMLInputElement
    emit('updateValue', input.value)
  }
}
</script>
