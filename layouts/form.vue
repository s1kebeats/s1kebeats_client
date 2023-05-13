<template>
  <div id="form" class="flex flex-col min-h-[100dvh]">
    <!-- <UiFormLayoutPoster /> -->
    <main
      class="grow bg-white flex flex-col items-center justify-center gap-7 px-[7.5%] pb-5"
    >
      <nuxt-link to="/">
        <UiLogo class="mx-auto w-[35%]" />
      </nuxt-link>
      <slot />
    </main>
  </div>
</template>
