import { renderHook, act } from '@testing-library/react-hooks';
import useAPI from './useAPI';
import { AsyncFunction, APIFetch, APIStatus } from './types';

let api: AsyncFunction;
const renderUseAPI = (
  _api: APIFetch<typeof api>,
  _defaultStatus?: Partial<APIStatus<typeof api>>
) => renderHook(() => useAPI(_api, _defaultStatus));

beforeEach(() => {
  api = () => Promise.resolve(0);
});

it('should return apiFetch and apiStatus', () => {
  const { result } = renderUseAPI(api);
  const [apiStatus, apiFetch] = result.current;
  expect(apiFetch).toBeInstanceOf(Function);
  expect(apiStatus).toEqual({
    isLoading: false,
    response: null,
    error: null,
  });
});

it('should override default status if default status is set', () => {
  const error = new Error();
  const { result } = renderUseAPI(api, { isLoading: true, response: 0, error });
  const [apiStatus] = result.current;
  expect(apiStatus).toEqual({
    isLoading: true,
    response: 0,
    error,
  });
});

it('should set loading to true if api is called', () => {
  const { result } = renderUseAPI(api);
  const [, apiFetch] = result.current;
  act(() => apiFetch());
  const [apiStatus] = result.current;
  expect(apiStatus).toEqual({
    isLoading: true,
    response: null,
    error: null,
  });
});

it('should set data when api promise resolved', async () => {
  const { result } = renderUseAPI(api);
  const [, apiFetch] = result.current;
  await act(() => apiFetch());
  const [apiStatus] = result.current;
  expect(apiStatus).toEqual({
    isLoading: false,
    response: 0,
    error: null,
  });
});

it('should set error when api promise rejected', async () => {
  const error = new Error();
  api = () => Promise.reject(error);
  const { result } = renderUseAPI(api);
  const [, apiFetch] = result.current;
  await act(() => apiFetch());
  const [apiStatus] = result.current;
  expect(apiStatus).toEqual({
    isLoading: false,
    response: null,
    error,
  });
});

it('only set last api data when api promises resolved', async () => {
  const timeouts = [100, 0, 50];
  api = (n) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(n), timeouts[n]);
    });
  };
  const { result } = renderUseAPI(api);
  const [, apiFetch] = result.current;
  await act(async () => {
    await Promise.all([apiFetch(0), apiFetch(1), apiFetch(2)]);
  });
  const [apiStatus] = result.current;
  expect(apiStatus).toEqual({
    isLoading: false,
    response: 2,
    error: null,
  });
});

it('only set last api error when api promises rejected', async () => {
  const timeouts = [100, 0, 50];
  api = (n) => {
    return new Promise((_, reject) => {
      setTimeout(() => reject(n), timeouts[n]);
    });
  };
  const { result } = renderUseAPI(api);
  const [, apiFetch] = result.current;
  await act(async () => {
    await Promise.all([apiFetch(0), apiFetch(1), apiFetch(2)]);
  });
  const [apiStatus] = result.current;
  expect(apiStatus).toEqual({
    isLoading: false,
    response: null,
    error: 2,
  });
});
