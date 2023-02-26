<template>
  <div class="w-[1480px] grow flex flex-col gap-5 pb-[75px]">
    <div class="grow flex items-stretch gap-5">
      <div class="w-[35%] flex flex-col gap-5">
        <BeatUploadMp3Input
          :value="beat.image ? beat.image.name : ''"
          @update-value="updateBeatMedia('image', $event)"
        />
        <BeatUploadWavInput
          :value="beat.image ? beat.image.name : ''"
          @update-value="updateBeatMedia('image', $event)"
        />
      </div>
      <BeatUploadImageInput
        :value="beat.image ? beat.image.name : ''"
        @update-value="updateBeatMedia('image', $event)"
      />
      <BeatUploadStemsInput
        :value="beat.image ? beat.image.name : ''"
        @update-value="updateBeatMedia('image', $event)"
      />
    </div>
    <div class="flex justify-end">
      <BaseButton class="px-5 text-xs">Далее</BaseButton>
    </div>
    <!-- <div class="flex gap-2">
      <BaseTitledInput
        class="w-[400px] bg-white"
        title="Название"
        :value="beat.name"
        placeholder="Введите название"
        @update-value="updateBeatInfo('name', $event)"
      />
      <BaseTitledInput
        class="w-[170px] bg-white"
        title="Темп"
        type="number"
        :value="beat.bpm"
        placeholder="Введите BPM"
        @update-value="updateBeatInfo('bpm', $event)"
      />
      <BeatUploadImageInput
        :value="beat.image ? beat.image.name : ''"
        @update-value="updateBeatMedia('image', $event)"
      />
      <BaseButton
        v-show="beat.image"
        @click="clearBeatMediaInput('image')"
        class="text-xs py-1 px-3 rounded-md gap-3"
      >
        <Icon name="lucide:trash-2" size="16px" />
      </BaseButton>
    </div>
    <div class="flex gap-2">
      <div class="flex flex-col gap-2">
        <BeatUploadWavInput
          :value="beat.wav ? beat.wav.name : ''"
          @update-value="updateBeatMedia('wav', $event)"
        />
        <BeatUploadMp3Input
          :value="beat.mp3 ? beat.mp3.name : ''"
          @update-value="updateBeatMedia('mp3', $event)"
        />
      </div>
      <BaseTitledInput
        class="w-[500px] -[132px] bg-white"
        title="Описание"
        type="area"
        :value="beat.description"
        placeholder="Введите описание"
        @update-value="updateBeatInfo('description', $event)"
      />
    </div>

    <div class="flex items-start justify-start gap-2">
      <div class="flex flex-col gap-1">
        <BeatUploadStemsInput
          :value="beat.stems ? beat.stems.name : ''"
          @update-value="updateBeatMedia('stems', $event)"
        />
        <BaseButton
          v-show="beat.stems"
          @click="clearBeatMediaInput('stems')"
          class="text-xs py-1 px-1 rounded-md"
          >Удалить архив</BaseButton
        >
      </div>
      <BaseTitledInput
        class="w-[200px] bg-white"
        title="Цена за Trackout"
        type="number"
        :value="beat.stemsPrice"
        placeholder="Введите сумму"
        @update-value="updateBeatInfo('stemsPrice', $event)"
      >
        <Icon name="material-symbols:currency-ruble" />
      </BaseTitledInput>
      <BaseTitledInput
        class="w-[200px] bg-white"
        title="Цена за аудио"
        type="number"
        :value="beat.wavePrice"
        placeholder="Введите сумму"
        @update-value="updateBeatInfo('wavePrice', $event)"
      >
        <Icon name="material-symbols:currency-ruble" />
      </BaseTitledInput>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import BeatUpload from '@/api/models/BeatUpload';

const beat = reactive<BeatUpload>({
  name: '',
  bpm: null,
  description: '',
  wavePrice: null,
  stemsPrice: null,
  wav: null,
  mp3: null,
  stems: null,
  image: null,
});
const updateBeatMedia = async (
  field: 'stems' | 'image' | 'wav' | 'mp3',
  value: File | null
) => {
  beat[field] = value;
};
const updateBeatInfo = (
  field: 'name' | 'bpm' | 'description' | 'wavePrice' | 'stemsPrice',
  value: number | string
) => {
  beat[field] = value;
};
const clearBeatMediaInput = (field: 'stems' | 'image' | 'wav' | 'mp3') => {
  beat[field] = null;
};
</script>
<style scoped>
.bg-image {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5),
      rgba(121, 69, 252, 0.45)
    ),
    url('~/assets/images/profile-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
