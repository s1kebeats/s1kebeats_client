<template>
  <a target="_blank" data-testid="link" :href="url + username">
    <Icon :name="icon" data-testid="icon" :size="size" />
  </a>
</template>
<script setup lang="ts">
interface Props {
  username: string;
  size: string;
  icon: string;
  url: string;
}
const props = withDefaults(defineProps<Props>(), {
  width: '25px',
  height: '25px',
});
</script>
