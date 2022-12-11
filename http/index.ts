import axios, { AxiosRequestConfig } from "axios";
import { useUserStore } from "../stores/user";

export const API_URL = 'http://localhost:5000/api'

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})
$api.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers!.Authorization = 'Bearer'+ useUserStore.accessToken;
    return config;
})

export default $api