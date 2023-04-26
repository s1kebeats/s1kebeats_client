<template>
  <nuxt-link class="menu-link" :to="to">
    <Icon :name="icon" size="22px" />
    <span> {{ text }} </span></nuxt-link
  >
</template>
<script setup lang="ts">
const props = defineProps<{
  to: string;
  icon: string;
  text: string;
}>();
</script>
<style lang="scss">
.menu-link {
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.75rem;
}
</style>
