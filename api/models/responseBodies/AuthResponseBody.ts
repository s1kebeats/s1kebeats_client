import type User from '@/api/models/User';

export default interface AuthResponseBody {
  accessToken: string;
  user: User;
}
