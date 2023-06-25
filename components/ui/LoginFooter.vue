<template>
  <footer class="text-sm flex items-center gap-2" data-testid="loginFooter">
    <!-- TODO: Rest password functionality -->
    <!-- <nuxt-link
      to="/login"
      class="text-black font-semibold transition-all"
      >Забыли пароль?</nuxt-link
    >| -->
    <span class="text-black font-semibold transition-all"
      >Новый пользователь?</span
    >
    <nuxt-link
      to="/register"
      class="text-[#7945fc] font-semibold transition-all hover:brightness-[75%]"
      >Регистрация</nuxt-link
    >
  </footer>
</template>
