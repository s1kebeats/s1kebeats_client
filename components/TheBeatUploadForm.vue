<template>
    <div class="bg-image rounded-lg w-[1480px] h-[500px] flex flex-col gap-5 p-5">
        <h2 class="text-white font-semibold text-md">Информация</h2>
        <div class="flex items-center justify-between">
            <BaseTitledInput class="w-[400px] bg-white" title="Название" :value="''" placeholder="Введите название бита" />
            <BaseTitledInput class="w-[200px] bg-white" title="Темп" type="number" :value="''" placeholder="Введите BPM" />
        </div>
        <h2 class="text-white font-semibold text-md">Медиа</h2>
        <div class="flex items-center justify-between">
            <BaseTitledInput class="w-[400px] bg-white" title="Название" :value="''" placeholder="Введите название бита" />
            <BaseTitledInput class="w-[200px] bg-white" title="Темп" type="number" :value="''" placeholder="Введите BPM" />
        </div>
    </div>
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