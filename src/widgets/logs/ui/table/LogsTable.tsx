import { useQuery } from "@tanstack/react-query";
import { fetchLogs } from "../../../../shared/api/logs";
import { useState, useMemo } from "react";
import type { LogStatus } from "../../../../shared/types/logs"; 

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
import { TablePagination } from "./components/TablePagination";
import { exportToCSV } from "../../../../shared/utils/exportToCSV";

export const LogsTable = () => {
    const [statusFilter, setStatusFilter] = useState<LogStatus | "">("");
    const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);
    const [appliedDateRange, setAppliedDateRange] = useState<[string | null, string | null]>([null, null]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['logs', statusFilter, appliedDateRange[0], appliedDateRange[1]],
        queryFn: () => fetchLogs({ 
            status: statusFilter || undefined,
            from: appliedDateRange[0] || undefined,
            to: appliedDateRange[1] || undefined,
            limit: 200, 
        }),
        enabled: true,
    });

    const allItems = useMemo(() => {
        return data?.data?.items || [];
    }, [data?.data?.items]);

    const paginatedItems = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return allItems.slice(start, start + pageSize);
    }, [allItems, currentPage, pageSize]);

    const totalPages = Math.ceil(allItems.length / pageSize);


    const handleReset = () => {
        setStatusFilter("");
        setDateRange([null, null]);
        setAppliedDateRange([null, null]);
        setCurrentPage(1)
    }

    const hadleExportCSV = () => {
        exportToCSV(
            allItems,
            "logs",
             [
        { key: "request_id", label: "Request ID" },
        { key: "user_id", label: "User ID" },
        { key: "scenario",      label: "Scenario" },
        { key: "status", label: "Status" },
        { key: "error_message", label: "Error Reason" },
        { key: "created_at", label: "Created At" },
        { key: "completed_at", label: "Completed At" },
    ]
        );
    };
    
    if (isLoading) return <Typography sx={{ p: 3 }}>Загрузка логов...</Typography>;
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <>
                <Typography variant="h6" gutterBottom
                    sx={{
                        textAlign: 'left'
                    }}>
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

                    <Button variant="outlined" color="primary" sx={{ ml: 'auto' }}
                        onClick={hadleExportCSV}>Экспорт CSV</Button>
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
                            ) : paginatedItems.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <EmptyState />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedItems.map((log) => (
                                    <LogsTableRow
                                        key={log.request_id}
                                        log={log}
                                    />
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={allItems.length}
                    pageSize={pageSize}
                    onPageChange={setCurrentPage}
                    onPageSizeChange={(newSize) => {
                        setPageSize(newSize);
                        setCurrentPage(1);
                    }}
                />
            </>
        </LocalizationProvider>
    );
};