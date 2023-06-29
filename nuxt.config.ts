import tsconfigPaths from 'vite-tsconfig-paths';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/fonts.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      API_URL: 'http://192.168.1.135:5000/api',
      MEDIA_URL: 'http://192.168.1.135:5000/api/media/',
    },
  },
  modules: ['@pinia/nuxt', 'nuxt-icon'],
  vite: {
    plugins: [tsconfigPaths()],
  }
});
