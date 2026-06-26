import { Outlet } from 'react-router-dom';
import { Sidebar } from '../widgets/layout/ui/Sidebar/Sidebar'; 
import { useAuth } from '../shared/context/AuthContext';
export const MainLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <Sidebar
        user={
          isAuthenticated
            ? {
                name: 'Ирина С.',
                avatar: '',
              }
            : undefined
        }
      />

      <main
        style={{
          flex: 1,
          padding: '20px',
          overflow: 'auto',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};
