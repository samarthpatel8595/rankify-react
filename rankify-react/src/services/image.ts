//
const BASE_URL = process.env.NEXT_PUBLIC_IMG_API_BASE_URL!;
const API_KEY = process.env.NEXT_PUBLIC_PODCAST_X_API_KEY as string;
 
const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
});
export const generateImages = async (payload: any) => {
  const res = await fetch(`${BASE_URL}/api/generate`, { // ✅ FINAL FIX
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
 
  const text = await res.text();
 
  console.log("STATUS:", res.status);
  console.log("RAW RESPONSE:", text);
 
  if (!res.ok) {
    throw new Error(`API Error: ${text}`);
  }
 
  return JSON.parse(text);
};
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
 