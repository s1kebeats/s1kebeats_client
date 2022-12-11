import { User } from "./User";

export interface AuthResponse {
    accessToken: string;
    refreshTOken: string;
    user: User;
}