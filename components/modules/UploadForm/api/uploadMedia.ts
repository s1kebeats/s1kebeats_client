import $api from '~~/api';

export default async function uploadMedia(
  path: string,
  file: File
): Promise<string> | never {
  const runtimeConfig = useRuntimeConfig();
  try {
    const { data: key } = await $api.post(
      `${runtimeConfig.public.API_URL}/media/upload`,
      {
        path,
        file,
      }
    );
    return key;
  } catch (error) {
    throw error;
  }
}
