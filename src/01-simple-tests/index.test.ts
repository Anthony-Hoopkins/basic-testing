import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 7, action: Action.Add });
    expect(result).toBe(10);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 13, b: 2, action: Action.Subtract });
    expect(result).toBe(11);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 13, b: 2, action: Action.Multiply });
    expect(result).toBe(26);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 13, b: 2, action: Action.Divide });
    expect(result).toBe(6.5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(27);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 3, b: 3, action: 'invalid_action' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 'a', b: 3, action: Action.Multiply });
    expect(result).toBeNull();
  });
});
