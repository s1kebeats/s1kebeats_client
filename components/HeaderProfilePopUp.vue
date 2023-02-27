<template>
  <div
    class="shadow min-w-[100px] absolute z-[9999] right-0 top-11 bg-white rounded-md flex flex-col items-center gap-2 p-3"
    v-show="show"
  >
    <nuxt-link
      v-if="!userStore.authorized"
      to="/login"
      class="w-full text-right text-xs text-black font-bold flex items-center justify-start gap-3"
    >
      <Icon name="material-symbols:login-rounded" size="16px" />
      <span> Войти </span>
    </nuxt-link>

    <template v-else>
      <nuxt-link
        to="/upload"
        class="bg-black text-white text-center rounded-md py-2 text-xs w-full"
      >
        Опубликовать
      </nuxt-link>
      <nuxt-link
        :to="`/${userStore.user.username}`"
        class="w-full text-right text-sm text-black font-medium flex items-center justify-start gap-3 transition-all !hover:text-[#7945fc]"
      >
        <Icon name="gg:profile" size="18px" />
        <span> Профиль </span>
      </nuxt-link>
      <nuxt-link
        to="/liked"
        class="w-full text-right text-sm text-black font-medium flex items-center justify-start gap-3 transition-all !hover:text-[#7945fc]"
      >
        <Icon name="icon-park-outline:like" size="18px" />
        <span> Понравившееся </span>
      </nuxt-link>
      <BaseLogoutButton />
    </template>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

const props = defineProps<{
  show: boolean;
}>();
</script>
<style lang="scss" scoped>
.shadow {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
