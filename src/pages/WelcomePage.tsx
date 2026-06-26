import { Box, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/A_Logo_v2.svg";

export const WelcomePage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100dvh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Box sx={{ 
                    padding: "5px 9px", 
                    mb: "36px" 
                }}>
                    <img 
                        src={Logo} 
                        alt="АстроСтилист" 
                        style={{ 
                            width: "242px", 
                            height: "99px",
                            display: "block"
                        }} 
                    />
                </Box>

                <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                    sx={{
                        width: "260px",
                        height: "36px",
                        mb: "16px",
                        textTransform: "none",
                        fontSize: "16px",
                    }}
                >
                    Вход
                </Button>

                <Box 
                    sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "8px",
                        justifyContent: "center"
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            fontWeight: "regular",
                            lineHeight: "143%",
                            letterSpacing: "0.17px",
                            color: "text.secondary",
                        }}
                    >
                        Нет аккаунта?
                    </Typography>

                    <Link
                        component="button"
                        variant="body2"
                        onClick={() => navigate("/register")}
                        sx={{
                            textDecoration: "none",
                            fontWeight: 500,
                            color: "primary.main",
                            "&:hover": {
                                textDecoration: "underline",
                            },
                        }}
                    >
                        Регистрация
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};