import { Box, Typography } from "@mui/material";
import GridOffIcon from "@mui/icons-material/GridOff";

export const EmptyState = () => {
    return (
        <Box
    sx={{
        py: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
    }}>
        <GridOffIcon color="disabled" fontSize="large" />
        <Typography variant="h6">Записи не найдены</Typography>
        <Typography color="text.secondary">Попробуйте изменить параметры поиска</Typography>
    </Box>
    )
}