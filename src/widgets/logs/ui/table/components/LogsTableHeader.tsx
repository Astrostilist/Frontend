import { TableCell, TableHead, TableRow } from "@mui/material";

export const LogsTableHeader = () => {
    return (
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
    );
};