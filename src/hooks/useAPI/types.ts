export type AsyncFunction = (...args: any[]) => Promise<any>;

export type FetchResult<T> = T extends (...args: any[]) => PromiseLike<infer U> ? U : T;

export type FetchPromise<T> = Promise<FetchResult<T>>;

export type APIFetch<T extends AsyncFunction> = (...args: Parameters<T>) => Promise<void>;

export type APIStatus<T extends AsyncFunction> = {
  isLoading: boolean;
  response: FetchResult<T> | null;
  error: Error | null;
};
