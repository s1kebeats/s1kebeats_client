import RegistrationForm from './RegistrationForm.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import validationMessages from './validationMessages';

import { createMock, getMock } from 'storybook-addon-module-mock';

const meta: Meta<typeof RegistrationForm> = {
  parameters: {
    layout: 'centered',
  },
  decorators: [
    () => ({
      template:
        '<div class="w-[576px] flex items-center justify-center"><story/></div>',
    }),
  ],
  component: RegistrationForm,
};
export default meta;

type Story = StoryObj<typeof RegistrationForm>;

export const Empty: Story = {
  render: () => ({
    components: { RegistrationForm },
    template: `
      <RegistrationForm />
    `,
  }),
};

export const Validation: Story = {
  render: () => ({
    components: { RegistrationForm },
    template: `
      <RegistrationForm />
    `,
  }),
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);

    await user.click(canvas.getByTestId('actionButton'));
    // await expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
    //   'Введите имя пользователя'
    // );
    // await user.type(
    //   canvasElement.querySelector('input[name=registrationUsername]')!,
    //   'johndoe'
    // );
    // await expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
    //   'Имя пользователя занято'
    // );

    // await userEvent.type(
    //   canvasElement.querySelector('input[name=registrationEmail]')!,
    //   'email@provider.com'
    // );
    // await userEvent.type(
    //   canvasElement.querySelector('input[name=registrationPassword]')!,
    //   'Password1234'
    // );
    // await userEvent.type(
    //   canvasElement.querySelector('input[name=registrationPasswordConfirm]')!,
    //   'Password1234'
    // );
  },
};
