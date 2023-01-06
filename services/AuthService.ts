import $api from '../http';
import { AxiosResponse } from 'axios';
import AuthResponse from '../models/AuthResponse';

class AuthService {
  static async login(
    username: string,
    password: string,
    refresh: boolean
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', { username, password, refresh });
  }
  static async register(
    username: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/register', { username, email, password });
  }
  static async edit({
    displayedName,
    about,
    youtube,
    vk,
    instagram,
    image,
  }: {
    displayedName: string;
    about: string;
    youtube: string;
    vk: string;
    instagram: string;
    image: File;
  }): Promise<AxiosResponse> {
    return $api.post('/edit', {
      displayedName,
      about,
      youtube,
      vk,
      instagram,
      image,
    });
  }
  static async activate(activationLink: string): Promise<AxiosResponse> {
    return $api.get(`/activate/${activationLink}`);
  }
  static async logout(): Promise<AxiosResponse> {
    return $api.post('/logout');
  }
}
export default AuthService;
