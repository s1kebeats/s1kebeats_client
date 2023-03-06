export default async function register(
  username: string,
  email: string,
  password: string
) {
  const runtimeConfig = useRuntimeConfig();
  const response = await $fetch<{ available: boolean }>(
    `${runtimeConfig.public.API_URL}/register`,
    {
      method: 'POST',
      body: {
        username,
        email,
        password,
      },
    }
  );
  return response;
}
