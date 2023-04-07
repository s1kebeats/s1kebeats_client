import $api, { API_URL } from '../api';
import axios, { type AxiosResponse } from 'axios';
import type AuthResponse from '../api/models/AuthResponse';

class AuthService {
  static async login(
    username: string,
    password: string,
    refresh: boolean
  ): Promise<AxiosResponse<AuthResponse>> {
    return await $api.post<AuthResponse>('/login', {
      username,
      password,
      refresh,
    });
  }

  static async register(
    username: string,
    email: string,
    password: string
  ): Promise<AxiosResponse> {
    return await $api.post('/register', { username, email, password });
  }

  static async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return await axios.post(`${API_URL}/refresh`, null, {
      withCredentials: true,
    });
  }

  // static async edit({
  //   displayedName,
  //   about,
  //   youtube,
  //   vk,
  //   instagram,
  //   image,
  // }: {
  //   displayedName: string;
  //   about: string;
  //   youtube: string;
  //   vk: string;
  //   instagram: string;
  //   image: File;
  // }): Promise<AxiosResponse> {
  //   return $api.post('/edit', {
  //     displayedName,
  //     about,
  //     youtube,
  //     vk,
  //     instagram,
  //     image,
  //   });
  // }
  // static async activate(activationLink: string): Promise<AxiosResponse> {
  //   return $api.get(`/activate/${activationLink}`);
  // }
  static async logout(): Promise<AxiosResponse> {
    return await axios.post(`${API_URL}/logout`, null, {
      withCredentials: true,
    });
  }
}
export default AuthService;
