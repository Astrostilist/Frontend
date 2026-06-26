import { Routes, Route, Navigate } from 'react-router-dom';
import { WelcomePage } from '../../pages/WelcomePage';
import { RegisterPage } from '../../pages/RegisterPage';
import { LoginPage } from '../../pages/LoginPage';
import { LogsPage } from '../../pages/LogsPage';
import { MainLayout } from '../../layouts/MainLayout';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => {
  return (
    <Routes>
        <Route element={<MainLayout />}>
        {/* главная страница*/}
        <Route path="/" element={<WelcomePage />} />

        {/* формы авторизации*/}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* защищенные страницы ток для авторизованных*/}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
            <Route path="/logs" element={<LogsPage />} />
            <Route path="/" element={<Navigate to="/logs" replace />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
