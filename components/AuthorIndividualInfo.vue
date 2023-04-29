<template>
  <section class="w-full mt-5 px-[3%]">
    <div class="border-[1px] rounded-t-lg overflow-hidden">
      <div class="bg-image px-[5%] flex items-end pb-3 justify-between">
        <image
          v-if="author.image"
          class="translate-y-1/4 w-[35%] aspect-square rounded-full"
          :src="`${runtimeConfig.public.API_URL}/media/${author.image}`"
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
      <div class="pb-3 pt-[7.5%] px-[5%]">
        <div class="flex items-center justify-between">
          <div class="font-semibold text-xl max-w-[40%] truncate">
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
        <div v-if="!author.about" class="multiline text-left text-xs">
          {{ author.about }}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti eum
          aliquam laudantium alias, aspernatur nisi dolores libero quidem,
          reprehenderit earum eligendi illo eveniet doloribus quis tempore
          architecto pariatur consectetur fugit.
        </div>
      </div>
    </div>
    <!-- <div
      class="bg-image pt-[20%] relative w-full rounded-t-lg border-[1px] bg-black"
    >
      <div class="relative bg-white w-full px-[5%]">
        <image
          v-if="author.image"
          class="absolute top-[-100%] w-[30%] aspect-square rounded-full"
          :src="`${runtimeConfig.public.API_URL}/media/${author.image}`"
          width="20%"
          :alt="author.username"
        />
        <div
          v-else
          class="relative top-[-] w-[30%] aspect-square bg-black flex items-center justify-center text-white text-3xl rounded-full"
          :alt="author.username"
        >
          ?
        </div>
        <div class="flex items-start justify-between gap-[40px]">
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
                <UiInstagramLink
                  v-if="author.instagram"
                  :username="author.instagram"
                  width="19px"
                  height="19px"
                />
                <UiVkLink
                  v-if="author.vk"
                  :username="author.vk"
                  width="19px"
                  height="19px"
                />
                <UiYoutubeLink
                  v-if="author.youtube"
                  :username="author.youtube"
                  width="19px"
                  height="19px"
                />
              </div>
            </div>
          </div>
          <div v-if="author.about" class="multiline text-left max-h-[100%] text-sm pt-[8px] font-semibold">
            {{ author.about }}
          </div>
          <nuxt-link
            v-if="authStore.user?.username === route.params.username"
            to="/settings"
            class="bg-black text-white rounded-md py-2 px-2 text-xs transition-all flex items-center gap-2"
          >
            <Icon name="material-symbols:edit" size="16px" />
            Редактировать профиль
          </nuxt-link>
        </div>
      </div>
    </div> -->
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
