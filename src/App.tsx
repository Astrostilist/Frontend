import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Sidebar } from './widgets/layout/ui/Sidebar/Sidebar';

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    localStorage.setItem('token', 'my-test-token');
  }, []);

  return (
    <>
      <h1>{t('astrostilist')}</h1>

      <button onClick={() => i18n.changeLanguage('ru')}>RU</button>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
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
