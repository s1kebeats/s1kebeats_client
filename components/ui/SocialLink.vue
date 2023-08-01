<template>
  <a target="_blank" data-testid="socialLink" :href="url + username">
    <Icon :icon="icon" data-testid="socialLinkIcon" :class="`text-[${size}]`" />
  </a>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';

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
