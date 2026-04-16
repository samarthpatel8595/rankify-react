// import { ImageGenerateResponse, ImageGenerateRequest } from "@/types/index"; // Adjust the import path as needed
import { apiRequest } from ".";

//
const BASE_URL = process.env.NEXT_PUBLIC_IMG_API_BASE_URL!;
const API_KEY = process.env.NEXT_PUBLIC_PODCAST_X_API_KEY as string;
 
const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
});
export const generateImage = async (
  payload: any,
): Promise<any> =>
  apiRequest<any>(
    {
      method: "POST",
      url: "/api/generate",
      headers: getHeaders(),
      data: payload,
      timeout: 10 * 60 * 1000,
    },
    {
      baseURL: BASE_URL,
    },
  );
 
// -----------------------------
// MODELS
// -----------------------------
export const fetchImageModels = async () => {
  const res = await fetch(`${BASE_URL}/api/models`, {
    method: "GET",
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.detail || "Models failed");
 
  return data;
};
 
// -----------------------------
// CONFIG (sizes + ratios)
// -----------------------------
export const fetchImageConfig = async () => {
  const res = await fetch(`${BASE_URL}/api/image-sizes`, {
    method: "GET",
    headers: getHeaders(),
  });
 
  const data = await res.json();
  if (!res.ok) throw new Error(data?.detail || "Config failed");
 
  return data;
};
 