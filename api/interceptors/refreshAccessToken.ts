import refresh from '@/stores/api/refresh';
import $api from '@/api';

export default async function (error: any) {
  const request = error.config;
  if (error.response.status === 401) {
    const { data } = await refresh();
    localStorage.setItem('accessToken', data.accessToken);

    return await $api.request(request);
  } else {
    throw error;
  }
}
