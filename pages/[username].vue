<template>
  <AuthorIndividualView
    :author="author!"
    :show-edit="route.params.username === authStore.user?.username"
  />
</template>
<script setup lang="ts">
import AuthorIndividualView from '@/views/pages/AuthorIndividual.vue';
import AuthorIndividual from '@/api/models/AuthorIndividual';
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
