import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../../pages/LoginPage";
import { LogsPage } from "../../pages/LogsPage";
import { AdminLayout } from "../../widgets/layout/AdminLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { CatalogPage } from "../../pages/CatalogPage";
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

            {/* Новый маршрут для каталога */}
            <Route
                path="/catalog"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<CatalogPage />} />
            </Route>

            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};