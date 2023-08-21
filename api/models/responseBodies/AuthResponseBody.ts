import type User from '@/api/models/User';

export default interface AuthResponseBody {
  data: {
    accessToken: string;
    user: User;
  }
}
