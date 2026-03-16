import { toast } from "react-toastify";
import type { ApiError } from "./index";

const showApiErrorToast = (error: ApiError) => {
  if (typeof window === "undefined") return;
  if (error.isCanceled) return;

  if (error.isTimeout) {
    toast.error("Request timed out. Please try again.");
    return;
  }
  if (error.isNetworkError) {
    toast.error("Network error. Check your connection and retry.");
    return;
  }
  if (error.status && error.status >= 500) {
    toast.error("Server error. Please try again in a moment.");
    return;
  }

  toast.error(error.message || "Something went wrong.");
};

export { showApiErrorToast };
