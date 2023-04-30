import tsconfigPaths from 'vite-tsconfig-paths';
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
      API_URL: 'http://192.168.1.135:5000/api',
      MEDIA_URL: 'http://192.168.1.135:5000/api/media/',
    },
  },
  vite: {
    plugins: [tsconfigPaths()],
  },
});
