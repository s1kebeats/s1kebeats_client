<template>
  <div class="flex gap-1 items-center">
    <InstagramLink
      v-if="author.instagram"
      :username="author.instagram"
      :size="size"
      data-testid="instagram"
    />
    <VkLink
      v-if="author.vk"
      :username="author.vk"
      :size="size"
      data-testid="vk"
    />
    <YoutubeLink
      v-if="author.youtube"
      :username="author.youtube"
      :size="size"
      data-testid="youtube"
    />
  </div>
</template>
<script setup lang="ts">
import AuthorIndividual from '@/api/models/AuthorIndividual';
import { InstagramLink, VkLink, YoutubeLink } from '@s1kebeats/s1kebeats-ui'

const props = defineProps<{
    author: AuthorIndividual;
    size?: "sm" | "md" | "lg"
}>()
</script>
