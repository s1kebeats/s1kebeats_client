import $api from "@/api";

export default async function activate(link: string) {
    try {
        await $api.post(`/activate/${link}`)
    } catch (error) {
        throw error;
    }
}