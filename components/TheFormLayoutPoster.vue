<template>
  <section
    class="bg-image grow flex flex-col items-center justify-center gap-10"
  >
    <BaseLogo width="40%" color="white" />
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
