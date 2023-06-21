<template>
  <section class="w-full mt-3 px-[3%]">
    <div class="border-[1px] rounded-lg overflow-hidden">
      <div class="bg-image px-[5%] flex items-end pb-3 justify-between">
        <AppApiImage
          v-if="author.image"
          class="translate-y-1/4 w-[35%] aspect-square rounded-full shadow-sm"
          :src="author.image"
          width="20%"
          :alt="author.username"
        />
        <div
          v-else
          class="translate-y-1/4 w-[35%] aspect-square bg-black flex items-center justify-center text-white text-2xl rounded-full"
          :alt="author.username"
        >
          ?
        </div>
        <nuxt-link
          v-if="authStore.user?.username === route.params.username"
          to="/settings"
          class="bg-black text-white rounded-md py-2 px-2 text-xs transition-all flex items-center gap-2"
        >
          <Icon name="material-symbols:edit" size="16px" />
          Редактировать
        </nuxt-link>
      </div>
      <div class="flex flex-col gap-3 pb-3 pt-[7.5%] px-[5%]">
        <div class="flex items-center justify-between">
          <div class="font-semibold text-xl max-w-[calc(95%-76px)] truncate">
            {{ author.displayedName ? author.displayedName : author.username }}
          </div>
          <div class="flex gap-1 items-center">
            <UiInstagramLink
              v-if="author.instagram"
              :username="author.instagram"
              size="22px"
            />
            <UiVkLink v-if="author.vk" :username="author.vk" size="22px" />
            <UiYoutubeLink
              v-if="author.youtube"
              :username="author.youtube"
              size="22px"
            />
          </div>
        </div>
        <div v-if="author.about" class="multiline text-left text-xs">
          {{ author.about }}
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import AuthorIndividual from '@/api/models/AuthorIndividual';
import useAuthStore from '@/stores/auth';
const runtimeConfig = useRuntimeConfig();
const authStore = useAuthStore();
const route = useRoute();
const props = defineProps<{
  author: AuthorIndividual;
}>();
</script>
<style scoped lang="scss">
.bg-image {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8),
      rgba(121, 69, 252, 0.65)
    ),
    url('~/assets/images/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
.multiline {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
