import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { LogsPage } from "../../pages/LogsPage";
import { AdminLayout } from "../../widgets/layout/AdminLayout";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route
                path="/logs"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<LogsPage />} />
            </Route>

            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};