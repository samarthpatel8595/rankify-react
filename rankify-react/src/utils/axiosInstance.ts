import axios, { AxiosInstance } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;
const DEFAULT_TIMEOUT_MS = 15000;

type TokenGetter = () => string | null | undefined;

let getToken: TokenGetter | null = null;
let authToken: string | null = null;
let onUnauthorized: (() => void) | null = null;

const resolveToken = (): string | null => {
  if (getToken) return getToken() ?? null;
  return authToken;
};

const attachInterceptors = (client: AxiosInstance): AxiosInstance => {
  client.interceptors.request.use((config) => {
    const token = resolveToken();
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401 && onUnauthorized) {
        onUnauthorized();
      }
      return Promise.reject(error);
    },
  );

  return client;
};

const createApiClient = (overrideBaseUrl?: string): AxiosInstance =>
  attachInterceptors(
    axios.create({
      baseURL: overrideBaseUrl ?? baseURL,
      timeout: DEFAULT_TIMEOUT_MS,
      headers: {
        "Content-Type": "application/json",
      },
    }),
  );

const apiClient = createApiClient();

const setAuthToken = (token: string | null) => {
  authToken = token;
};

const setAuthTokenGetter = (getter: TokenGetter | null) => {
  getToken = getter;
};

const setUnauthorizedHandler = (handler: (() => void) | null) => {
  onUnauthorized = handler;
};

export {
  apiClient,
  createApiClient,
  setAuthToken,
  setAuthTokenGetter,
  setUnauthorizedHandler,
};
