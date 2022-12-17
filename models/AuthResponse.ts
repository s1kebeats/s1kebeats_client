import User from './User';

export default interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
