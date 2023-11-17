export const BASE_API_URL = process.env.REACT_APP_BASE_URL;
export const WS_API_URL = process.env.REACT_APP_SOCKET_URL;

export const DEFAULT_HEADERS = {
  // "Content-Type": "application/json",
  "Cache-Control": "no-cache",
};

export const DEFAULT_REQUEST_CONFIG = {
  timeout: 8000,
  showNetworkError: true,
  baseUrl: BASE_API_URL,
};
