import $api from '../http';
import { type AxiosResponse } from 'axios';
import type Author from '../models/Author';
import type AuthorIndividual from '../models/AuthorIndividual';

class AuthorService {
  static async getAuthors(q?: string): Promise<AxiosResponse<Author[]>> {
    return $api.get<Author[]>('/author', { params: q });
  }

  static async getIndividualAuthor(
    username: string
  ): Promise<AxiosResponse<AuthorIndividual>> {
    return $api.get<AuthorIndividual>(`/author/${username}`);
  }
}
export default AuthorService;
