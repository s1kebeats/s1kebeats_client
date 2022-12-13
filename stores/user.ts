import axios, { AxiosError } from "axios";
import { defineStore } from "pinia";
import { API_URL } from "~~/http";
import AuthService from "~~/services/AuthService";
import User from "../models/User";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            accessToken: '',
            authorized: false,
            user: {} as User
        }
    },
    actions: {
        setAccessToken(accessToken: string) {
            this.accessToken = accessToken;
        },
        setUser(user: User) {
            this.user = user;
        },
        setAuthorized(state: boolean) {
            this.authorized = state;
        },
        async login(username: string, password: string) {
            try {
                const response = await AuthService.login(username, password);
                this.setAccessToken(response.data.accessToken);
                this.setAuthorized(true)     
                this.setUser(response.data.user);
            } catch (e) {
                const error = e as AxiosError;
                console.log(error.message)
            }
        },
        async logout() {
            try {
                const response = await AuthService.logout();
                this.setAccessToken('');
                this.setAuthorized(false);
                this.setUser({} as User);
            } catch (e) {
                const error = e as AxiosError;
                console.log(error.message)
            }
        },
        async checkAuth() {
            try {
                const response = await axios.get(`${API_URL}/refresh`);
                this.setAccessToken(response.data.accessToken)
                this.setAuthorized(true)     
                this.setUser(response.data.user);
            } catch (e) {
                const error = e as AxiosError;
                console.log(error.message)
            }
        }
    }
})