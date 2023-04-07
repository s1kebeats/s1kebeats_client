import $api from '@/api';

export default async function activate(activation: string): Promise<void> {
  await $api.post(`/activate/${activation}`);
}
