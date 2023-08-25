import { type User } from '@/api/models';

export default interface AuthResponseBody {
  accessToken: string;
  user: User;
}
