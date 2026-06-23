import { useState } from "react";
import {
    Button,
    Paper,
    TextField,
    Typography,
    Alert,
    CircularProgress,
} from "@mui/material";

import { loginAdmin } from "../shared/api/auth";
import { useAuth } from "../shared/context/AuthContext";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email || !password) {
            setError("Введите email и пароль");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await loginAdmin({ email, password });

            if (response?.data?.access_token) {
                login(response.data.access_token);
                navigate("/logs", { replace: true });
            } else {
                setError("Не удалось войти");
            }
        } catch (err: any) {
            setError(err?.message || "Неверный email или пароль");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper
            sx={{
                maxWidth: 400,
                mx: "auto",
                mt: 10,
                p: 4,
            }}
        >
            <Typography variant="h5" gutterBottom align="center">
                Вход в админку
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
            />

            <TextField
                fullWidth
                type="password"
                label="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
            />

            <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={loading}
                sx={{ mt: 3 }}
            >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Войти"}
            </Button>
        </Paper>
    );
};