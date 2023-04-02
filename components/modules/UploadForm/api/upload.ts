import BeatUpload from "@/api/models/BeatUpload";
import $api from "@/api";

export default async function upload(data: BeatUpload) {
    const runtimeConfig = useRuntimeConfig();
    const response = await $api.post<{}>(
      `${runtimeConfig.public.API_URL}/beat/upload`,
      {
        method: 'POST',
        body: {
          ...data
        },
      }
    );
    return response;
}