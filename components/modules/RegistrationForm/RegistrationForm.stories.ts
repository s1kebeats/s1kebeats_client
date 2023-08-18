import RegistrationForm from './RegistrationForm.vue';
import type { Meta, StoryObj } from '@storybook/vue3';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import validationMessages from './validationMessages';
import { decorator as usenameAvailableMockDecorator } from './__mocks__/usernameAvailable';
import { decorator as registerMockDecorator } from './__mocks__/register';

const meta: Meta<typeof RegistrationForm> = {
  parameters: {
    layout: 'centered',
  },
  decorators: [
    usenameAvailableMockDecorator,
    registerMockDecorator,
    () => ({
      template:
        '<div class="w-[576px] flex items-center justify-center"><story/></div>',
    }),
  ],
  component: RegistrationForm,
};
export default meta;

type Story = StoryObj<typeof RegistrationForm>;

const usernameInputSelector = 'input[name=registrationUsername]';
const emailInputSelector = 'input[name=registrationEmail]';
const passwordInputSelector = 'input[name=registrationPassword]';
const passwordConfirmInputSelector = 'input[name=registrationPasswordConfirm]';

export const FillValidSubmitFail: Story = {
  name: 'SUBMIT_VALID: Fill the form with valid values and submit it, with failed register API call - should not render ValidationErrorOutput messages, should render with visible FormRequestErrorOutput',
  render: () => ({
    components: { RegistrationForm },
    template: `
      <RegistrationForm />
    `,
  }),
  parameters: {
    usernameAvailable: true,
    registerResponse: new Error(),
  },
  play: async function ({ canvasElement, step }) {
    const user = userEvent.setup();
    const canvas = within(canvasElement);

    await step('Fill the form with valid data', async () => {
      await user.type(
        canvasElement.querySelector(usernameInputSelector)!,
        'johndoe'
      );
      await user.type(
        canvasElement.querySelector(emailInputSelector)!,
        'email@provider.com'
      );
      await user.type(
        canvasElement.querySelector(passwordInputSelector)!,
        'Password1234'
      );
      await user.type(
        canvasElement.querySelector(passwordConfirmInputSelector)!,
        'Password1234'
      );
    });
    setTimeout(async () => {
      await step('Submit the form', async () => {
        await user.click(canvas.getByTestId('actionButton'));
      });
      await waitFor(async () => {
        expect(
          canvas.queryByTestId('validationErrorOutput')
        ).not.toBeInTheDocument();
        expect(canvas.queryByTestId('formRequestErrorOutput')).toBeVisible();
      });
    }, 500);
  },
};
export const FillValidSubmitSuccess: Story = {
  name: 'SUBMIT_VALID: Fill the form with valid values and submit it, with successful register API call - should not render ValidationErrorOutput messages, should render with invisible FormRequestErrorOutput',
  render: () => ({
    components: { RegistrationForm },
    template: `
      <RegistrationForm />
    `,
  }),
  parameters: {
    usernameAvailable: true,
    registerResponse: {},
  },
  play: async ({ canvasElement, step }) => {
    const user = userEvent.setup();
    const canvas = within(canvasElement);

    await step('Fill the form with valid data', async () => {
      await user.type(
        canvasElement.querySelector(usernameInputSelector)!,
        'johndoe'
      );
      await user.type(
        canvasElement.querySelector(emailInputSelector)!,
        'email@provider.com'
      );
      await user.type(
        canvasElement.querySelector(passwordInputSelector)!,
        'Password1234'
      );
      await user.type(
        canvasElement.querySelector(passwordConfirmInputSelector)!,
        'Password1234'
      );
    });
    setTimeout(async () => {
      await step('Submit the form', async () => {
        await user.click(canvas.getByTestId('actionButton'));
      });
      await waitFor(async () => {
        expect(
          canvas.queryByTestId('validationErrorOutput')
        ).not.toBeInTheDocument();
        expect(
          canvas.queryByTestId('formRequestErrorOutput')
        ).not.toBeVisible();
      });
    }, 500);
  },
};

// usernameInput

export const FillUsernameUnavailable: Story = {
  name: 'USERNAME_INPUT: Fill username input with valid username, with available API call returning "false" - should render validationErrorOutput with username.available validation message',
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
export const FillUsernameWithSpecialChars: Story = {
  name: 'USERNAME_INPUT: Fill username input with invalid username containing special chars - should render validationErrorOutput with username.available validation message',
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
export const FillUsernameClear: Story = {
  name: 'USERNAME_INPUT: Fill username input and clear its value - should render validationErrorOutput with username.required validation message',
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
export const EmptyUsernameFormSubmit: Story = {
  name: 'USERNAME_INPUT: Form submit with empty username input value - should render validationErrorOutput with username.required validation message',
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
export const FillUsernameValid: Story = {
  name: 'USERNAME_INPUT: Fill username input with valid value - should not render validationErrorOutput',
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

export const FillEmailInvalid: Story = {
  name: 'EMAIL_INPUT: Fill email input with invalid email - should render validationErrorOutput with email.valid validation message',
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
export const FillEmailClear: Story = {
  name: 'EMAIL_INPUT: Fill email input and clear its value - should render validationErrorOutput with email.required validation message',
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
export const EmptyEmailFormSubmit: Story = {
  name: 'EMAIL_INPUT: Form submit with empty email input value - should render validationErrorOutput with email.required validation message',
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
export const FillEmailValid: Story = {
  name: 'EMAIL_INPUT: Fill email input with valid value - should not render validationErrorOutput',
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

export const FillPasswordShort: Story = {
  name: 'PASSWORD_INPUT: Fill password input with value less than 8 chars long - should render validationErrorOutput with password.min validation message',
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
export const FillPasswordWithoutDigit: Story = {
  name: 'PASSWORD_INPUT: Fill password input with value more than 8 chars long without digits - should render validationErrorOutput with password.min validation message',
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
export const FillPasswordWithoutCapital: Story = {
  name: 'PASSWORD_INPUT: Fill password input with value more than 8 chars long with digit, without capital letters - should render validationErrorOutput with password.withCapitalLetter validation message',
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
export const FillPasswordClear: Story = {
  name: 'PASSWORD_INPUT: Fill password input and clear its value - should render validationErrorOutput with password.required validation message',
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
export const EmptyPasswordFormSubmit: Story = {
  name: 'PASSWORD_INPUT: Form submit with empty password input value - should render validationErrorOutput with password.required validation message',
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
export const FillPasswordValid: Story = {
  name: 'PASSWORD_INPUT: Fill password input with valid value - should not render validationErrorOutput',
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

export const FillPasswordConfirmUnmatched: Story = {
  name: 'PASSWORD_CONFIRM: Fill passwordConfirm input with unmatched value - should render validationErrorOutput with passwordConfirm.match validation message',
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
export const EmptyPasswordConfirmFormSubmit: Story = {
  name: 'PASSWORD_CONFIRM: Form submit with empty passwordConfirm input value - should render validationErrorOutput with passwordConfirm.required validation message',
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
export const FillPasswordConfirmValid: Story = {
  name: 'PASSWORD_CONFIRM: Fill passwordConfirm input with valid value - should not render validationErrorOutput',
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
