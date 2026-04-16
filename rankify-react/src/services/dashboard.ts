import { OptimizationResponse, SourceOption } from "@/types/dashboard";
import { apiRequest } from "./index";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL!;
const API_KEY = process.env.NEXT_PUBLIC_PODCAST_X_API_KEY as string;
 
const getHeaders = () => ({
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
});
// Get optimization data for a specific project
const getOptimization = async (
  projectKey: string,
): Promise<OptimizationResponse> =>
  apiRequest<OptimizationResponse>({
    method: "GET",
    url: `/scores/${projectKey}`,
  });
 
// Get list of available projects
const getSources = async (): Promise<SourceOption[]> =>
  apiRequest<SourceOption[]>({
    method: "GET",
    url: `/sources`,
  });
 

const exportRuns = async (website: string): Promise<Blob> => {
  const response = await fetch(
    `${BASE_URL}export-runs`, // ✅ correct endpoint
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        website: website, // ✅ REQUIRED FIELD
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error("EXPORT ERROR:", err);
    throw new Error("Export failed");
  }

  return response.blob();
};
 export { getOptimization, getSources, exportRuns };
export type { SourceOption };