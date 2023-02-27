// import {
//   SUCCESS,
//   NETWORK_ERROR,
//   FAILED,
//   NETWORK_ERROR_403,
// } from '../utils/constants/Constants';
// import {userSlice} from '../redux/slices';
// import {logoutUser} from '../redux/actions';
// import {AuthRequests} from './requests';
// import {fetchWithTimeout} from './FetchWithTimeout';
// import {CONFIG} from '../config';
// import {getBaseApiUrl} from '../utils/Helpers';
// import {logCrash} from '../utils/CrashReporter';
// import {t} from '../utils/language';
import { DEFAULT_HEADERS, DEFAULT_REQUEST_CONFIG } from "./Constants";
import type {
  RequestMethod,
  RequestConfig,
  RequestBody,
  ResponseType,
  NetworkHandlerType,
} from "./types";
// import { store } from "../context/authentication";

function buildUrl(parameters: object) {
  let qs = "";
  for (const key in parameters) {
    const value = parameters[key as keyof object];
    if (value) {
      qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1);
    qs = "?" + qs;
  }
  console.log(qs);
  return qs;
}

function getToken() {
  const state = localStorage.getItem("Authentication");
  return state ? JSON.parse(state).token : "no-token";
}

export const getFileUri = (uri: string): string => {
  // if (uri.startsWith('file://') && Platform.OS !== 'android') {
  //   return uri.replace('file://', '');
  // }
  return uri;
};

async function requestRunner<T>(
  method: RequestMethod,
  url: string,
  data: RequestBody,
  requestConfig?: RequestConfig
): Promise<ResponseType<T>> {
  const config = { ...DEFAULT_REQUEST_CONFIG, ...requestConfig };

  let finalUrl = config.baseUrl + url;

  if (config.params) {
    finalUrl += buildUrl(config.params);
  }

  /**
   * if @param getNewToken is in @config it means it's fetching new tokens by
   * refreshToken. Other wise it's a normal request
   *
   * for normal requests we use @Authorization token which is get from redux
   *
   * if @param newFetchedToken is in @config it means previous request is
   * failed by 401 and a new Authorization token is fetched and is passed to
   * @method requestRunner so we use it instead of reading it from @Authorization
   * Because sometimes it causes a delay and newer @Authorization token is missed
   */
  // const token = config.getNewToken
  //   ? refreshToken
  //   : config.newFetchedToken
  //   ? config.newFetchedToken
  //   : Authorization;

  // const token = getToken();
  const body =
    method === "GET" || !data
      ? undefined
      : data instanceof FormData
      ? data
      : JSON.stringify(data);
  const headers: Record<string, string> = {
    ...DEFAULT_HEADERS,
    ...config.extraHeaders,
    // Authorization: `Bearer ${token}`,
  };

  if (!(data instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  try {
    const response: Response = await fetch(finalUrl, { method, headers, body });
    const status = response.status;
    const data = await response.json();
    const { ok } = response;
    // if (status === 401 || status === 403) {
    //   store.dispatch({ type: "LOGOUT" });
    // }
    return {
      success: ok,
      httpStatus: status,
      payload: ok ? data : undefined,
      error: !ok ? data?.message : undefined,
    };
  } catch (error: any) {
    return {
      success: false,
      httpStatus: error?.response?.status,
      payload: undefined,
      error: error?.toString(),
    };
  }
}

// function showErrorMessage(title: string, callback?: () => unknown) {
//   //@ts-ignore
//   toast.show(title, {type: 'danger'});
//   if (callback) {
//     callback();
//   }
// }

const NetworkHandler: NetworkHandlerType = {
  get: async function (url, config) {
    return requestRunner("GET", url, undefined, config);
  },
  post: async function (url, data, config) {
    return requestRunner("POST", url, data, config);
  },
  put: async function (url, data, config) {
    return requestRunner("PUT", url, data, config);
  },
  delete: async function (url, data, config) {
    return requestRunner("DELETE", url, data, config);
  },
};

export default NetworkHandler;

export * from "./types";
