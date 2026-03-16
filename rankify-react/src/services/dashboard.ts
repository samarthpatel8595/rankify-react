import { OptimizationResponse, SourceOption } from "@/types/dashboard";
import { apiRequest } from "./index";

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

export { getOptimization, getSources };
export type { SourceOption };
