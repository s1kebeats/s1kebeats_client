import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { URL, fileURLToPath } from 'node:url';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router'],
      vueTemplate: true,
    }),
    vue(),
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
