<template>
  <section
    class="bg-image select-none border-b flex items-center justify-center w-full h-[480px]"
  >
    <div class="flex items-start gap-5 justify-center text-black">
      <h1 class="text-7xl font-semibold font-[Poppins]">s1kebeats</h1>
      <h2 class="text-3xl font-semibold font-[Poppins]">2023</h2>
      <!-- <BaseLogo width="360px" color="white" /> -->
    </div>
  </section>
</template>
<style scoped>
.bg-image {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.8),
      rgba(121, 69, 252, 0.55)
    ),
    url('~/assets/images/bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>