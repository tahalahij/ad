export type RequestConfig = {
  baseUrl?: string;
  getNewToken?: boolean;
  timeout?: number;
  showNetworkError?: boolean;
  params?: Record<string, unknown>;
  extraHeaders?: Record<string, unknown>;
  newFetchedToken?: string;
};

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type RequestBody = Record<string, unknown> | FormData | undefined;

export type ResponseType<T> = {
  success: boolean;
  httpStatus: number;
  payload: T | undefined;
  error: string | undefined;
}

export type NetworkHandlerType = {
  get: <T>(url: string, config?: RequestConfig) => Promise<ResponseType<T>>;
  post: <T>(
    url: string,
    data: RequestBody,
    config?: RequestConfig,
  ) => Promise<ResponseType<T>>;
  delete: <T>(
    url: string,
    data: RequestBody,
    config?: RequestConfig,
  ) => Promise<ResponseType<T>>;
  put: <T>(
    url: string,
    data: RequestBody,
    config?: RequestConfig,
  ) => Promise<ResponseType<T>>;
}