import $api from "../http";
import { AxiosResponse } from "axios";
import Author from "../models/Author";
import AuthorIndividual from "../models/AuthorIndividual";

class AuthorService {
    static async getAuthors(q?: string): Promise<AxiosResponse<Author[]>> {
        return $api.get<Author[]>("/author", { params: q });
    }
    static async getIndividualAuthor(username: string): Promise<AxiosResponse<AuthorIndividual>> {
        return $api.get<AuthorIndividual>(`/author/${username}`);
    }
}
export default AuthorService;