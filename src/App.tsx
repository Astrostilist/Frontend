import { useEffect } from 'react';
import { Sidebar } from './widgets/layout/ui/Sidebar/Sidebar';

function App() {

  useEffect(() => {
    localStorage.setItem('token', 'my-test-token');
  }, []);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Sidebar
          user={{
            name: 'Ирина С.',
            avatar: '',
          }}
        />
      </div>
    </>
  );
}

export default App;