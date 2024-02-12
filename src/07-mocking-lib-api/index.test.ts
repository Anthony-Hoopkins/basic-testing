import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const baseURL = 'https://jsonplaceholder.typicode.com';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const axiosClient = {
      get: jest.fn().mockResolvedValueOnce({ data: {} }),
    } as unknown as AxiosInstance;

    mockedAxios.create.mockReturnValue(axiosClient);

    await throttledGetDataFromApi('/posts');
    expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    // const axiosClient = {
    //   get: jest.fn().mockResolvedValueOnce({ data: {} }),
    // } as unknown as AxiosInstance;
    //
    // mockedAxios.create.mockReturnValue(axiosClient);
    //
    // await throttledGetDataFromApi('/url');
    // expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL });
    // const respData = [{ id: 11, title: 'Post for testing' }];
    //
    // const axiosClient = {
    //   get: jest.fn().mockResolvedValueOnce({ data: respData }),
    // } as unknown as AxiosInstance;
    //
    // mockedAxios.create.mockReturnValue(axiosClient);
    // expect(result).toEqual(respData);
  });

  test('should return response data', async () => {
    const resp = await throttledGetDataFromApi('/url');

    expect(resp).toEqual({});
  });
});
