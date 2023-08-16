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
    options: {
      builder: {
        viteConfigPath: './vite.config.ts',
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
  // usernameAvailable validator mock
  viteFinal: async (config) => {
    config.resolve.alias['./usernameAvailable'] = require.resolve(
      '../components/modules/RegistrationForm/__mocks__/usernameAvailable.js'
    );
    return config;
  },
};
