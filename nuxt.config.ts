// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css', '~/assets/css/fonts.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt', 'nuxt-icon'],
  runtimeConfig: {
    public: {
      baseUrl: process.env.API_URL ?? 'http://localhost:5000/api/',
    },
  },
});
