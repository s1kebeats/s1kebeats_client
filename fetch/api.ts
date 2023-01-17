const fetchApi = $fetch.create({
    baseURL: process.env.API_URL || 'http://localhost:5000/api',
    onRequest({ request }) {
        request('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
        return request;
    }
})