import { setup } from '@storybook/vue3';
import { createPinia } from 'pinia';

import '../assets/styles/output.css';
import '../assets/styles/fonts.css';

const pinia = createPinia();

setup((app) => {
  app.use(pinia);
});

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
  },
};

export default preview;
