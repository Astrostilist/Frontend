import type { LogsResponse, LogStatus } from "../types/logs";

interface FetchLogsParams {
    status?: LogStatus;
    from?: string;
    to?: string;
    limit?: number;
}

export const fetchLogs = async (params: FetchLogsParams = {}): Promise<LogsResponse> => {

    const queryParams = new URLSearchParams();

    if (params.status) {
        queryParams.append('status', params.status);
    }

    if (params.from) {
        queryParams.append('from', params.from);
    }

    if (params.to) {
        queryParams.append('to', params.to)
    }

     queryParams.append('limit', String(params.limit ?? 50));

     const response = await fetch(
    `/api/v1/admin/logs?${queryParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  );
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json()
}