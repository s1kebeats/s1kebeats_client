import RegistrationForm from './RegistrationForm.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import validationMessages from './validationMessages';
import { decorator as usenameAvailableMockDecorator } from './__mocks__/usernameAvailable';

const meta: Meta<typeof RegistrationForm> = {
  parameters: {
    layout: 'centered',
  },
  decorators: [
    usenameAvailableMockDecorator,
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

// Fill username input with unavailable username - should render validationErrorOutput with username.available validation message
export const FillUsernameInputUnavailable: Story = {
  render: () => ({
    components: { RegistrationForm },
    template: `
      <RegistrationForm />
    `,
  }),
  parameters: {
    usernameAvailable: false,
  },
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);

    await user.type(
      canvasElement.querySelector('input[name=registrationUsername]')!,
      'johndoe'
    );

    await waitFor(() => {
      expect(canvas.queryByTestId('validationErrorOutput')).toBeInTheDocument();
      expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
        validationMessages.username.available
      );
    });
  },
};
// Fill username input with special chars - should render validationErrorOutput with username.noSpecialChars validation message
export const FillUsernameInputSpecialChars: Story = {
  render: () => ({
    components: { RegistrationForm },
    template: `
      <RegistrationForm />
    `,
  }),
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);

    await user.type(
      canvasElement.querySelector('input[name=registrationUsername]')!,
      'johndoe!'
    );

    await waitFor(() => {
      expect(canvas.queryByTestId('validationErrorOutput')).toBeInTheDocument();
      expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
        validationMessages.username.noSpecialChars
      );
    });
  },
};
// Fill username input and clear - should render validationErrorOutput with username.required validation message
export const FillUsernameInputClear: Story = {
  render: () => ({
    components: { RegistrationForm },
    template: `
      <RegistrationForm />
    `,
  }),
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);

    await user.type(
      canvasElement.querySelector('input[name=registrationUsername]')!,
      'johndoe!'
    );
    await user.clear(
      canvasElement.querySelector('input[name=registrationUsername]')!
    );
    await waitFor(() => {
      expect(canvas.queryByTestId('validationErrorOutput')).toBeInTheDocument();
      expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
        validationMessages.username.required
      );
    });
  },
};
// Empty username input form submit - should render validationErrorOutput with username.required validation message
export const EmptyUsernameInputFormSubmit: Story = {
  render: () => ({
    components: { RegistrationForm },
    template: `
      <RegistrationForm />
    `,
  }),
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);

    await userEvent.type(
      canvasElement.querySelector('input[name=registrationEmail]')!,
      'email@provider.com'
    );
    await userEvent.type(
      canvasElement.querySelector('input[name=registrationPassword]')!,
      'Password1234'
    );
    await userEvent.type(
      canvasElement.querySelector('input[name=registrationPasswordConfirm]')!,
      'Password1234'
    );

    await user.click(canvas.getByTestId('actionButton'));
    await waitFor(() => {
      expect(canvas.queryByTestId('validationErrorOutput')).toBeInTheDocument();
      expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
        validationMessages.username.required
      );
    });
  },
};
// Fill username input with valid - should not render validationErrorOutput
export const FillUsernameInputValid: Story = {
  render: () => ({
    components: { RegistrationForm },
    template: `
      <RegistrationForm />
    `,
  }),
  parameters: {
    usernameAvailable: true,
  },
  play: async ({ canvasElement }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);

    await user.type(
      canvasElement.querySelector('input[name=registrationUsername]')!,
      'johndoe'
    );

    await waitFor(() => {
      expect(
        canvas.queryByTestId('validationErrorOutput')
      ).not.toBeInTheDocument();
    });
  },
};
