// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '~/assets/styles/main.scss',
    '~/assets/styles/fonts.css',
    '~/node_modules/@s1kebeats/s1kebeats-ui/dist/style.css',
  ],
  runtimeConfig: {
    public: {
      API_URL: 'http://192.168.1.135:5000/api',
      CLIENT_URL: 'http://192.168.1.135:3000',
      // MEDIA_URL: `${this.API_URL}/media`,
    },
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  // disables Nuxt components auto-imports
  components: {
    dirs: [],
  },
});
