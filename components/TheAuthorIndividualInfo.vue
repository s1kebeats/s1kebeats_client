<template>
  <section class="w-full h-[250px] w-[1480px]">
    <div
      class="bg-image pt-[130px] relative w-full h-full rounded-t-lg border-[1px] bg-black"
    >
      <div class="relative bg-white w-full h-full px-[40px]">
        <BaseApiImage
          v-if="author.image"
          class="absolute top-[-90px] w-[180px] h-[180px] rounded-full"
          :src="author.image"
          width="180px"
          height="180px"
          :alt="author.username"
        />
        <img
          v-else
          class="absolute top-[-90px] w-[180px] h-[180px] rounded-full"
          width="180px"
          height="180px"
          src="~/assets/images/logo_main.jpg"
          :alt="author.username"
        />
        <div
          class="ml-[220px] py-[20px] h-full flex items-start justify-between gap-[40px]"
        >
          <div class="flex flex-col max-w-[25%]">
            <div class="font-semibold text-xl truncate">
              {{
                author.displayedName ? author.displayedName : author.username
              }}
            </div>
            <div class="flex items-center justify-between">
              <span
                v-if="author.displayedName"
                class="font-semibold text-sm max-w-[60%] truncate"
                >@{{ author.username }}</span
              >
              <div class="flex gap-1 items-center">
                <BaseInstagramLink
                  v-if="author.instagram"
                  :username="author.instagram"
                  width="19px"
                  height="19px"
                />
                <BaseVkLink
                  v-if="author.vk"
                  :username="author.vk"
                  width="19px"
                  height="19px"
                />
                <BaseYoutubeLink
                  v-if="author.youtube"
                  :username="author.youtube"
                  width="19px"
                  height="19px"
                />
              </div>
            </div>
          </div>
          <!-- <div v-if="author.about" class="multiline text-left max-h-[100%] text-sm pt-[8px] font-semibold">
            {{ author.about }}
          </div> -->
          <nuxt-link
            v-if="userStore.user.username === route.params.username"
            to="/settings"
            class="bg-black text-white rounded-md py-2 px-2 text-xs transition-all flex items-center gap-2"
          >
            <Icon name="material-symbols:edit" size="16px" />
            Редактировать профиль
          </nuxt-link>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import AuthorIndividual from '~~/models/AuthorIndividual';
import { useUserStore } from '~~/stores/user';

const route = useRoute();
const userStore = useUserStore();
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
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}
</style>
