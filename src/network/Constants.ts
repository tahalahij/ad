export const BASE_API_URL = process.env.NODE_ENV === 'development' ? "http://localhost:3000/" : 'https://example.ir/';

export const DEFAULT_HEADERS = {
  // "Content-Type": "application/json",
  "Cache-Control": "no-cache",
};

export const DEFAULT_REQUEST_CONFIG = {
  timeout: 8000,
  showNetworkError: true,
  baseUrl: BASE_API_URL,
};
