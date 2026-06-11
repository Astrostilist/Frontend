import { useQuery } from "@tanstack/react-query";
import { fetchLogs } from "../../../../shared/api/logs";
import { useState } from "react";
import type { LogStatus, LogItem } from "../../../../shared/types/logs"; 

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangeFilter } from "./components/DateRangeFilter";
import { LogsTableHeader } from "./components/LogsTableHeader";
import { StatusFilter } from "./components/StatusFilter";
import { LogsTableRow } from "./components/LogsTableRow";

export const LogsTable = () => {
    const [statusFilter, setStatusFilter] = useState<LogStatus | "">("");
    const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);

    const { data, isLoading, error } = useQuery({
        queryKey: ['logs', statusFilter, dateRange],
        queryFn: () => fetchLogs({ 
            status: statusFilter || undefined,
            from: dateRange[0] || undefined,
            to: dateRange[1] || undefined,
            limit: 100 
        }),
    });

    const items: LogItem[] = data?.data?.items || [];
    
    if (isLoading) return <Typography sx={{ p: 3 }}>Загрузка логов...</Typography>;
    if (error) return <Typography sx={{ p: 3, color: "error.main" }}>Ошибка загрузки</Typography>;

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Таблица логов
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center", flexWrap: "wrap" }}>
                    <StatusFilter
                    value={statusFilter}
                    onChange={setStatusFilter}
                    />
                 
                    <DateRangeFilter
                    value={dateRange}
                    onChange={setDateRange}
                    />

                    <Button 
                        variant="outlined" 
                        onClick={() => setDateRange([null, null])}
                    >
                        Сбросить даты
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <LogsTableHeader />
                        <TableBody>
                            {items.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                        Логов пока нет
                                    </TableCell>
                                </TableRow>
                            ) : (
                                items.map((log) => (
                                    <LogsTableRow key={log.request_id} log={log} />
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </LocalizationProvider>
    );
};