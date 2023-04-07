import type BeatUpload from '@/api/models/BeatUpload';
import $api from '@/api';
import type Beat from '~~/api/models/Beat';
import { type AxiosResponse } from 'axios';

export default async function upload(
  data: BeatUpload
): Promise<AxiosResponse<Beat>> {
  const runtimeConfig = useRuntimeConfig();
  const response = await $api.post<Beat>(
    `${runtimeConfig.public.API_URL as string}/beat/upload`,
    {
      ...data,
    }
  );
  return response;
}
