// Uncomment the code below and write your tests
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
import fsPr from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const to = 777;

    doStuffByTimeout(callback, to);
    jest.advanceTimersByTime(to);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const to = 777;

    doStuffByTimeout(callback, to);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(to - 1);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const int = 777;

    doStuffByInterval(callback, int);
    jest.advanceTimersByTime(int);
    expect(callback).toHaveBeenCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const int = 777;

    doStuffByInterval(callback, int);
    jest.advanceTimersByTime(int * 5);
    expect(callback).toHaveBeenCalledTimes(5);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const jestSpy = jest.spyOn(path, 'join');

    const fPath = 'index.test.ts';
    await readFileAsynchronously(fPath);

    expect(jestSpy).toHaveBeenCalledWith(__dirname, fPath);
  });

  test('should return null if file does not exist', async () => {
    const fPath = 'fake.txt';
    const result = await readFileAsynchronously(fPath);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fPath = 'index.test.ts';

    const fileContent = 'This is the content of the file for test';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPr, 'readFile').mockResolvedValue(fileContent);

    const result = await readFileAsynchronously(fPath);

    expect(result).toEqual(fileContent);
  });
});
