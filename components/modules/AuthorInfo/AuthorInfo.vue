<template>
  <section class="w-full mt-3 px-[3%]">
    <div class="border-[1px] rounded-lg overflow-hidden">
      <div class="bg-image px-[5%] flex items-end pb-3 justify-between">
        <PresentationalAvatar
          size="custom"
          :username="author.username"
          :image="author.image"
          class="translate-y-1/4 w-[35%] desktop-text-lg"
        />
        <Button
          v-if="showEdit"
          icon="material-symbols:edit"
          size="sm"
          @click="redirect"
        >
          Редактировать
        </Button>
      </div>
      <div class="flex flex-col gap-3 pb-3 pt-[7.5%] px-[5%]">
        <div class="flex items-center justify-between">
          <div class="link desktop-text-md max-w-[calc(95%-76px)] truncate">
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
        <div v-if="author.about" class="multiline text-left desktop-text-xs">
          {{ author.about }}
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import AuthorIndividual from '@/api/models/AuthorIndividual';
import { Button, PresentationalAvatar } from '@s1kebeats/s1kebeats-ui';

const props = defineProps<{
  author: AuthorIndividual;
  showEdit?: boolean;
}>();

async function redirect() {
  await navigateTo('/settings');
}
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
