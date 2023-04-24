<template>
  <section class="bg-image grow flex">
    <nuxt-link class="w-[40%] max-w-[450px] m-auto" to="/">
      <UiLogo color="white" />
    </nuxt-link>
  </section>
</template>
<style scoped>
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
</style>
