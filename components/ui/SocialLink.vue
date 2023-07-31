<template>
  <a target="_blank" data-testid="socialLink" :href="url + username">
    <Icon :name="icon" data-testid="socialLinkIcon" :size="size" />
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
  size: '25px',
});
</script>
