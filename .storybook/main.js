/** @type { import('@storybook/vue3-vite').StorybookConfig } */
export default {
  stories: ['../**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-nuxt',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/vue3-vite',
  },
  docs: {
    autodocs: 'tag',
  },
  // mocks
  viteFinal: async (config) => {
    config.resolve.alias['./usernameAvailable'] = require.resolve(
      '../components/modules/RegistrationForm/__mocks__/usernameAvailable.js'
    );
    config.resolve.alias['./register'] = require.resolve(
      '../components/modules/RegistrationForm/__mocks__/register.js'
    );
    return config;
  },
};
