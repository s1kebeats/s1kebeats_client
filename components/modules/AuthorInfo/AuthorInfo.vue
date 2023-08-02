<template>
  <section class="w-full mt-3 px-4">
    <div class="border-[1px] rounded-lg overflow-hidden">
      <div class="bg-grayscale-input px-4 flex items-end pb-3 justify-between">
        <PresentationalAvatar
          size="custom"
          :username="author.username"
          :image="author.image"
          class="translate-y-1/4 w-[clamp(100px,35%,1000px)] desktop-text-lg"
          data-testid="presentationalAvatar"
        />
        <Button
          v-if="showEdit"
          icon="material-symbols:edit"
          size="sm"
          @click="redirect"
          data-testid="editButton"
        >
        </Button>
      </div>
      <div class="flex flex-col gap-2 pb-3 pt-6 px-4">
        <div class="flex items-center justify-between">
          <div class="link desktop-text-md truncate" data-testid="authorName">
            {{ author.displayedName ? author.displayedName : author.username }}
          </div>
          <!-- TODO: design for socials -->
          <!-- <Socials :author="author" data-testid="socials" /> -->
        </div>
        <div
          v-if="author.about"
          class="cursor-pointer flex items-start"
          @click="toggleExpandAbout"
          data-testid="aboutWrapper"
        >
          <div
            class="text-left desktop-text-xs"
            :class="expandAbout ? '' : 'multiline'"
            data-testid="about"
          >
            {{ author.about }}
          </div>
          <button>
            <Icon
              icon="ic:baseline-keyboard-arrow-down"
              class="transition-all text-[23px]"
              :class="expandAbout ? 'rotate-180' : ''"
              data-testid="editIcon"
            />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Icon } from '@iconify/vue';
import AuthorIndividual from '@/api/models/AuthorIndividual';
import { Button, PresentationalAvatar } from '@s1kebeats/s1kebeats-ui';
import Socials from './components/Socials.vue';

const props = defineProps<{
  author: AuthorIndividual;
  showEdit?: boolean;
}>();

const expandAbout = ref(false);

function toggleExpandAbout() {
  expandAbout.value = !expandAbout.value;
}

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
    url('@/assets/images/bg.jpg');
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
