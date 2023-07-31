import path from 'path';
import { mergeConfig, loadConfigFromFile } from 'vite';

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
export default {
  stories: ['../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(baseConfig) {
    const { config: userConfig } = await loadConfigFromFile(
      path.resolve(__dirname, '../vite.config.ts')
    );

    return mergeConfig(baseConfig, userConfig);
  },
};
