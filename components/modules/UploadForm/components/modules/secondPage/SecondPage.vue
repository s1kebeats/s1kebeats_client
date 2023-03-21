<template>
  <section
    v-show="uploadStore.page === 2"
    class="w-[1480px] grow flex flex-col gap-5"
  >
    <div class="grow flex flex-col gap-5 h-[548px]">
      <div class="grow flex gap-5">
        <UiGradientFiller direction="top" />
        <Mp3Input @update-value="updateBeatMedia('mp3', $event)" />
        <WavInput @update-value="updateBeatMedia('wav', $event)" />
      </div>
      <div class="grow flex gap-5">
        <ImageInput @update-value="updateBeatMedia('image', $event)" />
        <StemsInput @update-value="updateBeatMedia('stems', $event)" />
        <UiGradientFiller direction="bottom" />
      </div>
    </div>
    <NavigationPanel />
  </section>
</template>
<script setup lang="ts">
import Mp3Input from './components/Mp3Input.vue';
import WavInput from './components/WavInput.vue';
import ImageInput from './components/ImageInput.vue';
import StemsInput from './components/StemsInput.vue';
import NavigationPanel from '@/components/modules/UploadForm/components/ui/NavigationPanel.vue';

import useUploadStore from '@/components/modules/UploadForm/store';

const uploadStore = useUploadStore();

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
  value: File
) => {
  beat[field] = value;
};
const updateBeatInfo = (
  field: 'name' | 'bpm' | 'description' | 'wavePrice' | 'stemsPrice',
  value: number | string
) => {
  beat[field] = value;
};
</script>
