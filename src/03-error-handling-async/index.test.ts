import {
  rejectCustomError,
  resolveValue,
  throwCustomError,
  throwError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const someValue = 'Awesome Value';
    const result = await resolveValue(someValue);

    expect(result).toBe(someValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMessage = 'Provided message!';

    expect(() => throwError(errorMessage)).toThrow(errorMessage);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const errorMessage = 'This is my awesome custom error!';

    expect(() => throwCustomError()).toThrow(errorMessage);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', () => {
    const errorMessage = 'This is my awesome custom error!';

    return expect(rejectCustomError()).rejects.toThrow(errorMessage);
  });
});
