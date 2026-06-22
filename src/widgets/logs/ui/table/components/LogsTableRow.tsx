import { TableCell, TableRow } from "@mui/material";
import { Chip } from "@mui/material";
import type { LogItem, LogStatus } from "../../../../../shared/types/logs";

interface LogsTableRowProps {
    log: LogItem;
}

const getStatusChip = (status: LogStatus) => {
    switch (status) {
        case "completed":
            return <Chip label="Success" color="success" size="small" variant="outlined" />;
        case "failed":
            return <Chip label="Failed" color="error" size="small" variant="outlined" />;
        case "processing":
            return <Chip label="Processing" color="warning" size="small" variant="outlined" />;
        case "pending":
            return <Chip label="Pending" color="primary" size="small" variant="outlined" />;
        default:
            return <Chip label={status} size="small" variant="outlined" />;
    }
};

export const LogsTableRow = ({ log }: LogsTableRowProps) => {
    return (
        <TableRow hover>
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
            <TableCell sx={{ maxWidth: 300 }}>
                {log.error_message || 'No error'}
            </TableCell>
        </TableRow>
    );
};