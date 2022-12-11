import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            accessToken: '',
        }
    },
    actions: {
        setAccessToken(accessToken: string) {
            this.accessToken = accessToken;
        }
    }
})