<template>
  <nuxt-link
    class="bg-white menu-link w-full py-3 border-[1px] rounded-lg px-4 link desktop-text-sm"
    :to="to"
    data-testid="navLink"
  >
    <span data-testid="navLinkText"> {{ text }} </span>
    <Icon data-testid="navLinkIcon" :name="icon" size="25px" />
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
}
</style>
