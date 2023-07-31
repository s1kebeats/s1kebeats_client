import axios from 'axios';

export default async function activate(activationCode: string) {
  const runtimeConfig = useRuntimeConfig();
  const response = await axios.post(
    `${runtimeConfig.public.API_URL}/activate/${activationCode}`
  );
  return response;
}
