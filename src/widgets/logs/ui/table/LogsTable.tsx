import { useQuery } from "@tanstack/react-query";
import { fetchLogs } from "../../../../shared/api/logs";
import { useState } from "react";
import type { LogStatus, LogItem } from "../../../../shared/types/logs"; 

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
} from "@mui/material";

export const LogsTable = () => {
    const [statusFilter, setStatusFilter] = useState<LogStatus | "">("");

    const { data, isLoading, error } = useQuery({
        queryKey: ['logs', statusFilter],
        queryFn: () => fetchLogs({ 
            status: statusFilter || undefined, 
            limit: 50 
        }),
    });

    const items: LogItem[] = data?.data?.items || [];

    const getStatusChip = (status: LogStatus) => {
        switch (status) {
            case "completed":
                return <Chip label="Success" color="success" size="small" />;
            case "failed":
                return <Chip label="Failed" color="error" size="small" />;
            case "processing":
                return <Chip label="Processing" color="warning" size="small" />;
            case "pending":
                return <Chip label="Pending" color="primary" size="small" />;
            default:
                return <Chip label={status} size="small" />;
        }
    };

    if (isLoading) return <Typography sx={{ p: 3 }}>Загрузка логов...</Typography>;
    if (error) return <Typography sx={{ p: 3, color: "error.main" }}>Ошибка загрузки</Typography>;

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Таблица логов
            </Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as LogStatus | "")}
                    style={{ 
                        padding: "10px", 
                        borderRadius: "4px", 
                        border: "1px solid #ccc",
                        minWidth: "180px"
                    }}
                >
                    <option value="">Все статусы</option>
                    <option value="completed">Success</option>
                    <option value="failed">Failed</option>
                    <option value="processing">Processing</option>
                    <option value="pending">Pending</option>
                </select>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Request ID</strong></TableCell>
                            <TableCell><strong>User ID</strong></TableCell>
                            <TableCell><strong>Created At</strong></TableCell>
                            <TableCell><strong>Scenario</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Error Reason</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                    Логов пока нет
                                </TableCell>
                            </TableRow>
                        ) : (
                            items.map((log) => (
                                <TableRow key={log.request_id} hover>
                                    <TableCell sx={{ fontFamily: 'monospace' }}>
                                        {log.request_id.substring(0, 8)}...
                                    </TableCell>
                                    <TableCell>{log.user_id}</TableCell>
                                    <TableCell>
                                        {new Date(log.created_at).toLocaleString('ru-RU')}
                                    </TableCell>
                                    <TableCell>{log.scenario || '-'}</TableCell>
                                    <TableCell>
                                        {getStatusChip(log.status)}
                                    </TableCell>
                                    <TableCell sx={{ color: 'error.main', maxWidth: 300 }}>
                                        {log.error_message || 'No error'}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};