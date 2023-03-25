<template>
  <div id="form" class="flex min-h-[100vh]">
    <UiFormLayoutPoster />
    <main
      class="w-[40%] bg-white flex flex-col items-center justify-center gap-7 px-[7.5%]"
    >
      <slot />
    </main>
  </div>
</template>
