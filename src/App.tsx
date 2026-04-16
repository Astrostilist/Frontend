import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // тестовый токен при старте приложения
    localStorage.setItem('token', 'my-test-token');
  }, []);

  return (
    <>
      <h1>{t('astrostilist')}</h1>
      <button onClick={() => i18n.changeLanguage('ru')}>RU</button>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
    </>
  );
}

export default App;
