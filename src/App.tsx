import { useEffect } from 'react';
import { Sidebar } from './widgets/layout/ui/Sidebar/Sidebar';
import { LogsTable } from './widgets/logs/ui/table/LogsTable';
function App() {

  useEffect(() => {
    const adminToken = 'local-admin-token';
    localStorage.setItem('token', adminToken);
  }, []);

  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        height: '100vh',
        overflow: 'hidden'
    }}>
      <Sidebar
        user={{
          name: 'Ирина С.',
          avatar: '',
        }}
      />
      
      <div style={{ 
          flex: 1, 
          overflow: 'auto', 
          padding: '20px',
          backgroundColor: '#f9f9f9'
      }}>
        <LogsTable />
      </div>
    </div>
  );
}

export default App;