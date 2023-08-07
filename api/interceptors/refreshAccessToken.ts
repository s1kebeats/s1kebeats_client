import refresh from '@/stores/api/refresh';
import $api from '@/api';

export default async function (error: {
  config: any;
  response: { status: 401 };
}) {
  const request = error.config;
  const { data } = await refresh();
  localStorage.setItem('accessToken', data.accessToken);
  return await $api.request(request);
}
