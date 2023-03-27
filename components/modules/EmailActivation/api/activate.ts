import $api from '@/api';

export default async function activate(activation: string) {
  try {
    await $api.post(`/activate/${activation}`);
  } catch (error) {
    throw error;
  }
}
