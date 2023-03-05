<template>
  <a target="_blank" data-testid="link" :href="url + username">
    <Icon :name="icon" data-testid="icon" :width="width" :height="height" />
  </a>
</template>
<script setup lang="ts">
interface Props {
  username: string;
  width: string;
  height: string;
  icon: string;
  url: string;
}
const props = withDefaults(defineProps<Props>(), {
  width: '25px',
  height: '25px',
});
</script>
