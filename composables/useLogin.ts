export default async function (
  username: string,
  password: string,
  rememberMe: boolean
) {
  //   const baseUrl = process.env.API_URL ?? 'http://localhost:5000';
  const baseUrl = 'http://localhost:5000/api';
  const { data, error } = await useFetch(`${baseUrl}/login`, {
    method: 'POST',
    body: {
      username,
      password,
      rememberMe,
    },
  });
  if (error) throw error;
  return data;
}
