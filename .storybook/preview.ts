import { type Preview, setup } from '@storybook/vue3';
import { createPinia } from 'pinia';
import { type App } from 'vue';

import './tailwind.css';
import '../assets/css/fonts.css';

const pinia = createPinia();

// setup((app: App) => {
//   app.use(pinia);
// });

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
