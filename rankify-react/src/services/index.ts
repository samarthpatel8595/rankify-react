import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { apiClient, createApiClient } from "@/utils/axiosInstance";
import { showApiErrorToast } from "@/services/apiToast";

export type ApiError = {
  message: string;
  status?: number;
  data?: unknown;
  code?: string;
  isNetworkError?: boolean;
  isTimeout?: boolean;
  isCanceled?: boolean;
};

type ApiRequestOptions = {
  baseURL?: string;
  client?: AxiosInstance;
  skipGlobalErrorToast?: boolean;
};

const getResponseMessage = (data: unknown): string | undefined => {
  if (!data || typeof data !== "object") return undefined;
  const maybeMessage = (data as { message?: unknown }).message;
  return typeof maybeMessage === "string" ? maybeMessage : undefined;
};

const toApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const isTimeout = error.code === "ECONNABORTED";
    const isCanceled =
      error.code === "ERR_CANCELED" ||
      error.message?.toLowerCase().includes("canceled");

    return {
      message: getResponseMessage(error.response?.data) ?? error.message,
      status: error.response?.status,
      data: error.response?.data,
      code: error.code,
      isNetworkError: !error.response && !isCanceled,
      isTimeout,
      isCanceled,
    };
  }

  return { message: "Unexpected error" };
};

const apiRequest = async <T>(
  config: AxiosRequestConfig,
  options: ApiRequestOptions = {},
): Promise<T> => {
  try {
    const client =
      options.client ?? (options.baseURL ? createApiClient(options.baseURL) : apiClient);
    const response = await client.request<T>(config);
    return response.data;
  } catch (error) {
    const apiError = toApiError(error);
    if (!options.skipGlobalErrorToast) {
      showApiErrorToast(apiError);
    }
    throw apiError;
  }
};

export { apiRequest };
