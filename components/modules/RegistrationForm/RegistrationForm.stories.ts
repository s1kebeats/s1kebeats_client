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

const usernameInputSelector = 'input[name=registrationUsername]';
const emailInputSelector = 'input[name=registrationEmail]';
const passwordInputSelector = 'input[name=registrationPassword]';
const passwordConfirmInputSelector = 'input[name=registrationPasswordConfirm]';

// usernameInput

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
      canvasElement.querySelector(usernameInputSelector)!,
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
      canvasElement.querySelector(usernameInputSelector)!,
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
      canvasElement.querySelector(usernameInputSelector)!,
      'johndoe!'
    );
    await user.clear(canvasElement.querySelector(usernameInputSelector)!);
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
      canvasElement.querySelector(emailInputSelector)!,
      'email@provider.com'
    );
    await userEvent.type(
      canvasElement.querySelector(passwordInputSelector)!,
      'Password1234'
    );
    await userEvent.type(
      canvasElement.querySelector(passwordConfirmInputSelector)!,
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
      canvasElement.querySelector(usernameInputSelector)!,
      'johndoe'
    );

    await waitFor(() => {
      expect(
        canvas.queryByTestId('validationErrorOutput')
      ).not.toBeInTheDocument();
    });
  },
};

// emailInput

// Fill email input with invalid email - should render validationErrorOutput with email.valid validation message
export const FillEmailInputInvalid: Story = {
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
      canvasElement.querySelector(emailInputSelector)!,
      'notAnEmail'
    );

    await waitFor(() => {
      expect(canvas.queryByTestId('validationErrorOutput')).toBeInTheDocument();
      expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
        validationMessages.email.valid
      );
    });
  },
};
// Fill email input and clear - should render validationErrorOutput with email.required validation message
export const FillEmailInputClear: Story = {
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
      canvasElement.querySelector(emailInputSelector)!,
      'email@example.com'
    );
    await user.clear(canvasElement.querySelector(emailInputSelector)!);
    await waitFor(() => {
      expect(canvas.queryByTestId('validationErrorOutput')).toBeInTheDocument();
      expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
        validationMessages.email.required
      );
    });
  },
};
// Empty email input form submit - should render validationErrorOutput with email.required validation message
export const EmptyEmailInputFormSubmit: Story = {
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

    await userEvent.type(
      canvasElement.querySelector(usernameInputSelector)!,
      'johndoe'
    );
    await userEvent.type(
      canvasElement.querySelector(passwordInputSelector)!,
      'Password1234'
    );
    await userEvent.type(
      canvasElement.querySelector(passwordConfirmInputSelector)!,
      'Password1234'
    );

    await user.click(canvas.getByTestId('actionButton'));
    await waitFor(() => {
      expect(canvas.queryByTestId('validationErrorOutput')).toBeInTheDocument();
      expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
        validationMessages.email.required
      );
    });
  },
};
// Fill email input with valid email - should not render validationErrorOutput
export const FillEmailInputValid: Story = {
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
      canvasElement.querySelector(emailInputSelector)!,
      'email@example.com'
    );

    await waitFor(() => {
      expect(
        canvas.queryByTestId('validationErrorOutput')
      ).not.toBeInTheDocument();
    });
  },
};

// passwordInput

// Fill password input with password less than 8 chars long - should render validationErrorOutput with password.min validation message
export const FillPasswordInputShort: Story = {
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
      canvasElement.querySelector(passwordInputSelector)!,
      '1234567'
    );

    await waitFor(() => {
      expect(canvas.queryByTestId('validationErrorOutput')).toBeInTheDocument();
      expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
        validationMessages.password.min
      );
    });
  },
};
// Fill password input with 8 char+ password without digit - should render validationErrorOutput with password.withDigit validation message
export const FillPasswordInputWithoutDigit: Story = {
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
      canvasElement.querySelector(passwordInputSelector)!,
      'password'
    );

    await waitFor(() => {
      expect(canvas.queryByTestId('validationErrorOutput')).toBeInTheDocument();
      expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
        validationMessages.password.withDigit
      );
    });
  },
};
// Fill password input with 8 char+ password with digit without capital letter - should render validationErrorOutput with password.withCapitalLetter validation message
export const FillPasswordInputWithoutCapital: Story = {
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
      canvasElement.querySelector(passwordInputSelector)!,
      'password1'
    );

    await waitFor(() => {
      expect(canvas.queryByTestId('validationErrorOutput')).toBeInTheDocument();
      expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
        validationMessages.password.withCapitalLetter
      );
    });
  },
};
// Fill password input and clear - should render validationErrorOutput with password.required validation message
export const FillPasswordInputClear: Story = {
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
      canvasElement.querySelector(passwordInputSelector)!,
      'Password1'
    );
    await user.clear(canvasElement.querySelector(passwordInputSelector)!);
    await waitFor(() => {
      expect(canvas.queryByTestId('validationErrorOutput')).toBeInTheDocument();
      expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
        validationMessages.password.required
      );
    });
  },
};
// Empty password input form submit - should render validationErrorOutput with password.required validation message
export const EmptyPasswordInputFormSubmit: Story = {
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

    await userEvent.type(
      canvasElement.querySelector(usernameInputSelector)!,
      'johndoe'
    );
    await userEvent.type(
      canvasElement.querySelector(emailInputSelector)!,
      'email@example.com'
    );
    await userEvent.type(
      canvasElement.querySelector(passwordConfirmInputSelector)!,
      'Password1234'
    );

    await user.click(canvas.getByTestId('actionButton'));
    await waitFor(() => {
      expect(canvas.queryByTestId('validationErrorOutput')).toBeInTheDocument();
      expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
        validationMessages.password.required
      );
    });
  },
};
// Fill password input with valid password - should not render validationErrorOutput
export const FillPasswordInputValid: Story = {
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
      canvasElement.querySelector(passwordInputSelector)!,
      'Password1'
    );

    await waitFor(() => {
      expect(
        canvas.queryByTestId('validationErrorOutput')
      ).not.toBeInTheDocument();
    });
  },
};

// passwordConfirmInput

// Fill passwordConfirm input with unmatched value - should render validationErrorOutput with passwordConfirm.match validation message
export const FillPasswordConfirmInputUnmatched: Story = {
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
      canvasElement.querySelector(passwordInputSelector)!,
      'Password1'
    );
    await user.type(
      canvasElement.querySelector(passwordConfirmInputSelector)!,
      'Password2'
    );

    await waitFor(() => {
      expect(canvas.queryByTestId('validationErrorOutput')).toBeInTheDocument();
      expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
        validationMessages.passwordConfirm.match
      );
    });
  },
};
// Empty passwordConfirm input form submit - should render validationErrorOutput with passwordConfirm.required validation message
export const EmptyPasswordConfirmInputFormSubmit: Story = {
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

    await userEvent.type(
      canvasElement.querySelector(usernameInputSelector)!,
      'johndoe'
    );
    await userEvent.type(
      canvasElement.querySelector(emailInputSelector)!,
      'email@example.com'
    );
    await userEvent.type(
      canvasElement.querySelector(passwordInputSelector)!,
      'Password1234'
    );

    await user.click(canvas.getByTestId('actionButton'));
    await waitFor(() => {
      expect(canvas.queryByTestId('validationErrorOutput')).toBeInTheDocument();
      expect(canvas.getByTestId('validationErrorOutput').textContent).toBe(
        validationMessages.passwordConfirm.required
      );
    });
  },
};
// Fill passwordConfirm input with matching value - should not render validationErrorOutput
export const FillPasswordConfirmInputValid: Story = {
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
    const testPassword = 'Password1';
    await user.type(
      canvasElement.querySelector(passwordInputSelector)!,
      testPassword
    );
    await user.type(
      canvasElement.querySelector(passwordConfirmInputSelector)!,
      testPassword
    );

    await waitFor(() => {
      expect(
        canvas.queryByTestId('validationErrorOutput')
      ).not.toBeInTheDocument();
    });
  },
};
