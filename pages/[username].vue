<template>
  <AuthorInfo
    :author="author!"
    :show-edit="authStore.user?.username === route.params.username"
  />
  <AuthorBeats :beats="author!.beats" />
</template>
<script setup lang="ts">
import AuthorIndividual from '@/api/models/AuthorIndividual';
import AuthorInfo from '@/components/modules/AuthorInfo/AuthorInfo.vue';
import AuthorBeats from '@/components/modules/AuthorBeats/AuthorBeats.vue';
import useAuthStore from '@/stores/auth';

const authStore = useAuthStore();
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const { data: author } = await useFetch<AuthorIndividual>(
  `${runtimeConfig.public.API_URL}/author/${route.params.username}`
);
if (!author.value) {
  showError({ statusCode: 404, statusMessage: 'Страница не найдена' });
}
</script>
