import { getBankAccount } from '.';

describe('BankAccount', () => {
  const balance = 300;

  test('should create account with initial balance', () => {
    const account = getBankAccount(balance);

    expect(account).toEqual({ _balance: balance });
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(balance);

    expect(() => account.withdraw(balance + 1)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const account = getBankAccount(balance);

    expect(() => account.withdraw(balance + 1)).toThrow(
      `Insufficient funds: cannot withdraw more than ${balance}`,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(balance);

    expect(() => account.transfer(100, account)).toThrow('Transfer failed');
  });

  test('should deposit money', () => {
    const account = getBankAccount(balance);

    expect(account.deposit(balance)).toEqual({ _balance: balance * 2 });
  });

  test('should withdraw money', () => {
    const account = getBankAccount(balance);

    expect(account.withdraw(balance / 2)).toEqual({ _balance: balance / 2 });
  });

  test('should transfer money', () => {
    const account = getBankAccount(balance);
    const otherAccount = getBankAccount(balance * 2);

    expect(account.transfer(balance / 2, otherAccount)).toEqual({
      _balance: balance / 2,
    });
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(balance);
    account.fetchBalance = jest.fn().mockResolvedValueOnce(50);

    const fetchedBalance = await account.fetchBalance();

    expect(fetchedBalance).toBe(50);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(balance);
    const newBalance = 3000;

    account.fetchBalance = jest.fn().mockResolvedValueOnce(newBalance);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(balance);
    account.fetchBalance = jest.fn().mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      'Synchronization failed',
    );
  });
});
