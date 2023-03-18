import axios from 'axios';

export default async function uploadMedia(path: string, media: File) {
  const runtimeConfig = useRuntimeConfig();
  const { data: key } = await axios.post(
    `${runtimeConfig.public.API_URL}/media/upload`
  );
}
