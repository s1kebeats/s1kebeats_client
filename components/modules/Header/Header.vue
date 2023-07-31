<template>
  <header class="header bg-[rgba(255,255,255,.9)]" data-testid="header">
    <nuxt-link to="/">
      <UiLogo class="w-[54px]" alt="s1kebeats" />
    </nuxt-link>
    <Search />
    <ProfileButton />
  </header>
</template>
<script setup lang="ts">
import Search from './components/Search.vue';
import ProfileButton from './components/ProfileButton.vue';
</script>
<style lang="scss" scoped>
.header {
  position: relative;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 3%;
}
</style>
