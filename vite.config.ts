import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router'],
      dirs: ['./composables'],
      vueTemplate: true,
    }),
    // Components({
    //   dirs: [
    //     './components/',
    //     // Component folders that should be auto-imported
    //   ],
    //   dts: true,
    //   directoryAsNamespace: true,
    // }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
      // Add any other aliases you use in your code base
      // https://nuxt.com/docs/api/configuration/nuxt-config/#alias
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
  },
});
