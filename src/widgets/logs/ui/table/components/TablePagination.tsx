import { Box, Typography, Button, FormControl, Select, MenuItem } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
    totalItems: number,
    pageSize: number,
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export const TablePagination = ({
    currentPage, 
    totalPages, 
    pageSize,
    onPageChange,
    onPageSizeChange, 
    totalItems
}: TablePaginationProps) => {
    if (totalItems === 0) return null;
    

    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            alignItems: 'center',
            gap: '26px', 
            mt: 3,
            px: 1
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    Строк на странице
                </Typography>
                <FormControl size="small">
                    <Select
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': { border: 'none'},
                         }}
                    >
                        {PAGE_SIZE_OPTIONS.map(size => (
                            <MenuItem key={size} value={size}>
                                {size}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Typography variant="body2" color="text.primary">
                {currentPage} из {totalPages}
            </Typography>

            <Box sx={{ display: 'flex'}}>
                <Button
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    startIcon={<ArrowBackIosIcon />}
                    sx={{ 
                        width: 40, 
                        height: 40, 
                        minWidth: 40,
                        padding: 0 
                    }}
                />

                <Button
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    endIcon={<ArrowForwardIosIcon />}
                    sx={{ 
                        width: 40, 
                        height: 40, 
                        minWidth: 40,
                        padding: 0 
                    }}
                    />
            </Box>
        </Box>
    );
};