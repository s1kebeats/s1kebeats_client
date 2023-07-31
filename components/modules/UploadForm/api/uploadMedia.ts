import $api from '@/api';

export default async function uploadMedia(
  path: string,
  file: File
): Promise<string> {
  const formData = new FormData();
  formData.append('path', path);
  formData.append('file', file);
  const { data: key } = await $api.post('/media/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return key;
}
