import refreshAccessToken from './refreshAccessToken';

export default async function (error: any) {
  if (error.response.status === 401) {
    return refreshAccessToken(error);
  } else {
    throw error;
  }
}
