import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 15, b: 2, action: Action.Subtract, expected: 13 },
  { a: 17, b: 12, action: Action.Subtract, expected: 5 },

  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 4, b: 4, action: Action.Multiply, expected: 16 },
  { a: 3, b: 5, action: Action.Multiply, expected: 15 },

  { a: 22, b: 2, action: Action.Divide, expected: 11 },
  { a: 33, b: 3, action: Action.Divide, expected: 11 },
  { a: 35, b: 5, action: Action.Divide, expected: 7 },

  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 8, b: 2, action: Action.Exponentiate, expected: 64 },

  { a: 22, b: 2, action: 'invalid_action', expected: null },
  { a: 33, b: 3, action: 'invalid_action2', expected: null },
  { a: 35, b: 5, action: 'invalid_action3', expected: null },

  { a: 'z', b: 2, action: Action.Divide, expected: null },
  { a: '_', b: 3, action: Action.Multiply, expected: null },
  { a: '{}', b: 5, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'simpleCalculator test',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
