import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    TextField,
    Typography,
    Link,
    CircularProgress,
} from "@mui/material";

import { loginAdmin } from "../shared/api/auth";
import { useAuth } from "../shared/context/AuthContext";

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
                setError("Неверный email или пароль");
            }
        } catch (err: unknown) {
            let errorMessage = "Неверный email или пароль";

            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (typeof err === 'string') {
                errorMessage = err;
            }

            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: 316,
                    minHeight: 408,
                    border: "1px solid #0000003B",
                    borderRadius: "8px",
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 600,
                        textAlign: "center",
                        mb: 4,
                        letterSpacing: "0px",
                    }}
                >
                    Вход
                </Typography>

                {error && (
                    <Box
                        sx={{
                            width: "260px",
                            minHeight: "76px",
                            mb: 3,
                            border: "1px solid #d32f2f",
                            borderRadius: "4px",
                            backgroundColor: "#fff0f0",
                            color: "#d32f2f",
                            fontWeight: "medium",
                            fontSize: "0.875rem",
                            lineHeight: "143%",
                            letterSpacing: "0.15px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            gap: "4px",
                        }}
                    >
                        <Typography
                            sx={{
                                fontWeight: "medium",
                                fontSize: "1rem",
                                lineHeight: "150%",
                                letterSpacing: "0.15px",
                                color: "#D32F2F",
                                mb: "2px",
                                padding: "14px 16px 0px 14px",
                            }}
                        >
                            Ошибка
                        </Typography>

                        <Typography
                            sx={{
                                fontWeight: "medium",
                                fontSize: "0.875rem",
                                lineHeight: "143%",
                                letterSpacing: "0.15px",
                                color: "#D32F2F",
                                padding: "0px 16px 14px 16px",
                            }}
                        >
                            {error}
                        </Typography>
                     </Box>
                )}

                <TextField
                    fullWidth
                    label="E-mail"
                    placeholder="astro@gmail.com"
                    variant="outlined"
                    size="medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mb: "20px", width: "260px" }}
                />

                <TextField
                    fullWidth
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    size="medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ mb: "8px", width: "260px" }}
                />

                <Link
                    component="button"
                    variant="body2"
                    onClick={() => alert("Функция восстановления пароля в разработке")}
                    sx={{
                        alignSelf: "flex-end",
                        mr: "28px",
                        mb: "36px",
                        fontSize: "14px",
                        color: "primary.main",
                    }}
                >
                    Забыли пароль?
                </Link>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={loading}
                    sx={{
                        width: "260px",
                        height: "36px",
                        mb: "16px",
                        textTransform: "none",
                    }}
                >
                    {loading ? <CircularProgress size={20} color="inherit" /> : "Войти"}
                </Button>

                {/* Нет аккаунта? Регистрация */}
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Typography variant="body2" color="text.secondary">
                        Нет аккаунта?
                    </Typography>
                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => navigate("/register")}
                        sx={{
                            color: "primary.main",
                            fontWeight: 400,
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                        }}
                    >
                        Зарегистрироваться
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};