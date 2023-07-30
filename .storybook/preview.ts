import { type Preview, setup } from '@storybook/vue3';
import { type App } from 'vue';

import '../assets/styles/main.css';

setup((app: App) => {

});

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
