import vue from '@vitejs/plugin-vue'
import path from 'path'
export default {
    plugins: [ vue() ],
    test: {
        globals: true,
        environment: 'happy-dom'
    },
    resolve: {
        alias: {
          '@': path.resolve(__dirname),
        },
      },
}