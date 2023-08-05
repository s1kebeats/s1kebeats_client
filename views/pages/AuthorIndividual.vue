<template>
  <AuthorInfo :author="author" :show-edit="showEdit" />
  <AuthorBeats :beats="author!.beats" />
</template>
<script setup lang="ts">
import AuthorIndividual from '@/api/models/AuthorIndividual';
import AuthorInfo from '@/components/modules/AuthorInfo/AuthorInfo.vue';
import AuthorBeats from '@/components/modules/AuthorBeats/AuthorBeats.vue';

const props = defineProps<{
  author: AuthorIndividual;
  showEdit: boolean;
}>();
</script>
