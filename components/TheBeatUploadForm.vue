<template>
  <div class="w-[1480px] flex flex-col gap-2">
    <div class="flex gap-2">
      <BaseTitledInput
        class="w-[400px] bg-white"
        title="Название"
        :value="''"
        placeholder="Введите название"
      />
      <BaseTitledInput
        class="w-[170px] bg-white"
        title="Темп"
        type="number"
        :value="''"
        placeholder="Введите BPM"
      />
    </div>
    <div class="flex gap-2">
      <BaseTitledInput
        class="w-[170px] bg-white"
        title="Цена .rar, руб."
        type="number"
        :value="''"
        placeholder="Введите цену"
      />
      <div class="flex flex-col gap-2">
        <BaseFileInput icon="ic:outline-music-note" name="mp3" title="WAV Аудио" />
        <!-- <BaseFileInput name="wave" title="MP3 Аудио" /> -->
      </div>
      <BaseTitledInput
        class="w-[400px] h-[132px] bg-white"
        title="Описание"
        type="area"
        :value="''"
        placeholder="Введите описание"
      />
    </div>
    <div class="flex items-center justify-start gap-2">
      <div class="flex flex-col gap-2">
        <BaseTitledInput
          class="w-[170px] bg-white"
          title="Цена .wav, руб."
          type="number"
          :value="''"
          placeholder="Введите цену"
        />
      </div>
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
