import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'path';

export default {
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue'],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    // error: https://github.com/danielroe/nuxt-vitest/issues/93
    // environment: 'nuxt',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
  },
};
