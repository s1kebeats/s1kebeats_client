<template>
  <div id="form" class="flex flex-col min-h-[100dvh]" data-testid="formLayout">
    <main
      class="grow bg-white flex flex-col items-center justify-center gap-7 px-[7.5%] pb-5"
    >
      <nuxt-link to="/" class="w-[45%]">
        <UiLogo class="mx-auto" />
      </nuxt-link>
      <slot />
    </main>
  </div>
</template>
