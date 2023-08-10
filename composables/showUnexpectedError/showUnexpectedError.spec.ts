import showUnexpectedError, {
  unexpectedErrorMessage,
} from './showUnexpectedError';
import { describe, it, expect, vi } from 'vitest';

vi.stubGlobal('showError', vi.fn());

const testError = {
  response: {
    status: 404,
  },
};

describe('showUnexpectedError', () => {
  it('should call showError with unexpectedErrorMessage and statusCode set to "500" if it is not present in provided error', () => {
    showUnexpectedError({});

    expect(showError).toHaveBeenCalled();
    expect(showError).toHaveBeenCalledWith({
      message: unexpectedErrorMessage,
      statusCode: 500,
    });
  });
  it('should call showError with unexpectedErrorMessage and statusCode from provided error if it is present', () => {
    showUnexpectedError(testError);

    expect(showError).toHaveBeenCalled();
    expect(showError).toHaveBeenCalledWith({
      message: unexpectedErrorMessage,
      statusCode: 404,
    });
  });
});
