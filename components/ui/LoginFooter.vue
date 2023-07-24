<template>
  <footer
    class="w-full desktop-text-xs flex items-center justify-center gap-2 overflow-hidden"
    data-testid="loginFooter"
  >
    <!-- TODO: Rest password functionality -->
    <!-- <nuxt-link
      to="/login"
      class="text-black link transition-all"
      >Забыли пароль?</nuxt-link
    >| -->
    <span class="text-black link transition-all truncate"
      >Новый пользователь?</span
    >
    <nuxt-link
      to="/register"
      class="text-primary link transition-all hover:text-primary-default_strong truncate"
      >Регистрация</nuxt-link
    >
  </footer>
</template>
