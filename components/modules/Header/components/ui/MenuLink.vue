<template>
  <nuxt-link class="menu-link w-full py-1" :to="to" data-testid="menuLink">
    <span data-testid="menuLinkText"> {{ text }} </span>
    <Icon data-testid="menuLinkIcon" :name="icon" size="25px" />
  </nuxt-link>
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
  justify-content: space-between;
  gap: 0.75rem;
}
</style>
