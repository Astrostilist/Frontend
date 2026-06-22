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
import { ErrorState } from "./components/ErrorState";
import { EmptyState } from "./components/EmptyState";

export const LogsTable = () => {
    const [statusFilter, setStatusFilter] = useState<LogStatus | "">("");
    const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);
    const [appliedDateRange, setAppliedDateRange] = useState<[string | null, string | null]>([null, null]);


    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['logs', statusFilter, appliedDateRange[0], appliedDateRange[1]],
        queryFn: () => fetchLogs({ 
            status: statusFilter || undefined,
            from: appliedDateRange[0] || undefined,
            to: appliedDateRange[1] || undefined,
            limit: 50, 
        }),
        enabled: true,
    });

    const items: LogItem[] = data?.data?.items || [];


    const handleReset = () => {
        setStatusFilter("");
        setDateRange([null, null]);
        setAppliedDateRange([null, null]);
    }
    
    if (isLoading) return <Typography sx={{ p: 3 }}>Загрузка логов...</Typography>;
    
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
                        onApply={setAppliedDateRange}
                    />

                    <Button variant="outlined" onClick={handleReset}>
                        Очистить фильтры
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table>
                        <LogsTableHeader />
                        <TableBody>
    {error ? (
        <TableRow>
            <TableCell colSpan={6}>
                <ErrorState onRetry={() => refetch()} />
            </TableCell>
        </TableRow>
    ) : items.length === 0 ? (
        <TableRow>
            <TableCell colSpan={6}>
                <EmptyState />
            </TableCell>
        </TableRow>
    ) : (
        items.map((log) => (
            <LogsTableRow
                key={log.request_id}
                log={log}
            />
        ))
    )}
</TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </LocalizationProvider>
    );
};