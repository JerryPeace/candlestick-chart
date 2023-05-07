import { useState, useCallback, useRef, MutableRefObject } from 'react';
import { AsyncFunction, FetchResult, FetchPromise, APIFetch, APIStatus } from './types';

/**
 * Hook for handling api call state.
 * apiStatus includes loading state, response data, response error.
 * apiFetch is a wrapped API call which changes apiStatus and handles race condition.
 * @param {function} api - The async function for fetch the actual API call. should return a promise
 * @param {object} [defaultStatus={}] - A default status to override the initial apiStatus
 * @returns {array} [apiStatus, apiFetch]
 */
export default function useAPI<T extends AsyncFunction>(
  api: T,
  defaultStatus: Partial<APIStatus<T>> = {}
): [APIStatus<T>, APIFetch<T>] {
  const [apiStatus, setAPIStatus] = useState<APIStatus<T>>({
    isLoading: false,
    response: null,
    error: null,
    ...defaultStatus,
  });

  // last called promise
  const lastPromiseRef: MutableRefObject<FetchPromise<T> | null> = useRef(null);

  const apiFetch: APIFetch<T> = useCallback(
    async (...args) => {
      // Set loading state
      setAPIStatus((prevState) => {
        return {
          ...prevState,
          isLoading: true,
        };
      });

      const promise: FetchPromise<T> = api(...args);
      lastPromiseRef.current = promise;

      try {
        const response: FetchResult<T> = await promise;
        // only use last call to set response
        if (promise === lastPromiseRef.current) {
          setAPIStatus({
            isLoading: false,
            response,
            error: null,
          });
        }
      } catch (error) {
        // only use last call to set error
        if (promise === lastPromiseRef.current) {
          setAPIStatus({
            isLoading: false,
            response: null,
            error,
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [api]
  );

  return [apiStatus, apiFetch];
}
