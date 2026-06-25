import { Box, Typography, Button } from "@mui/material";
import SyncProblemIcon from "@mui/icons-material/SyncProblem";

interface ErrorStateProps {
    onRetry: () => void;
}

export const ErrorState = ({onRetry}: ErrorStateProps) => {
    return (
        <Box
    sx={{
            py: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            }}>
                <SyncProblemIcon color="disabled" fontSize="large" />
                <Typography variant="h6">
                    Ошибка загрузки данных
                </Typography>

                <Typography color="text.secondary">
                    Проверьте соединение и попробуйте снова
                </Typography>

                <Button
                    variant="outlined"
                    size="small"
                    onClick={onRetry}
                >
                    Повторить
                </Button>
    </Box>
    )
}