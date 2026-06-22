export type LogStatus =
| 'pending'
| 'processing'
| 'completed'
| 'failed';

export interface LogItem {
    request_id: string;
    user_id: string;
    scenario: string;
    status: LogStatus;
    error_message: string | null;
    created_at: string;
    completed_at: string | null;
}

export interface LogsResponse {
  message: string;
  data: {
    items: LogItem[];
    total_count: number;
  };
}